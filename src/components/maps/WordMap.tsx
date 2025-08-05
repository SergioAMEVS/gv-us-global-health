'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { FeatureCollection, Feature, GeoJsonProperties, Geometry } from 'geojson';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import { PlayArrow } from '@mui/icons-material';
import StopIcon from '@mui/icons-material/Stop';
import FloatingIconButton from '../ui/FloatingIconButton';
import type { Topology, GeometryCollection } from 'topojson-specification';
import MapLeyend from './MapLeyend';
import type { MapDataRow } from '@/data/mapData';
import { geoCylindricalStereographic } from 'd3-geo-projection';
import YearSlider from './YearSlider';
import { Box, Fade } from '@mui/material';
import { useYearStore } from '@/lib/store/useStore';
import DropdownMenu from '../common/DropdownMenu';
import { useDrawer } from '@/hooks';
import RightSideDrawer from '../common/RightSideDrawer';
import DrawerContent from '../globalHealthFunding/WorldMapDrawerContent';
import FooterMap from './FooterMap';

type WorldMapProps = {
  data: MapDataRow[];
};

declare global {
  interface Window {
    zoomIn: () => void;
    zoomOut: () => void;
  }
}

export default function WorldMap({ data }: WorldMapProps) {
  const { years, year, setYear, setYears } = useYearStore();
  const { isOpen, headerText, children, openDrawer, closeDrawer } = useDrawer();

  const [legend, setLegend] = useState<{
    min: number;
    max: number;
    color0: string;
    color1: string;
  }>({ min: 0, max: 0, color0: '#CDD7E1', color1: '#97C3F0' });
  const ref = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const gRef = useRef<SVGGElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  const [isMapReady, setIsMapReady] = useState(false);

  /* SET YEAR OPTIONS FOR DROP DOWN FROM DATA */
  useEffect(() => {
    const y = Object.keys(data[0]).filter((k) => k !== 'country');
    setYears(y);
    setYear(y[0]);
  }, [setYear, setYears, data]);

  const globalMinMax = useMemo(() => {
    let min = Infinity;
    let max = -Infinity;
    for (const row of data) {
      for (const yearKey of Object.keys(row)) {
        if (yearKey === 'country') continue;
        const value = row[yearKey as keyof MapDataRow];
        if (typeof value === 'number' && value > 0) {
          if (value < min) min = value;
          if (value > max) max = value;
        }
      }
    }
    if (!isFinite(min)) min = 1;
    if (!isFinite(max)) max = 1;
    return { min, max };
  }, [data]);

  useEffect(() => {
    if (isPlaying && years.length > 0) {
      autoplayRef.current = setInterval(() => {
        const idx = years.indexOf(year);
        if (idx < years.length - 1) {
          setYear(years[idx + 1]);
        } else {
          setIsPlaying(false);
        }
      }, 1200);
    } else if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [isPlaying, years, year, setYear]);

  useEffect(() => {
    if (!ref.current) return;
    if (svgRef.current) return;

    const map_config = {
      data0: 'Entity',
      data1: 'Population',
      label0: 'label 0',
      label1: 'label 1',
      baseColor: '#CDD7E1',
      color0: '#EDF5FD',
      color1: '#0A2744',
      color2: '#0B6BCB',
      tooltipColor: '#616161E5',
      width: 1400,
      height: 650,
      max: 100,
      min: 0,
      format: ',.0f',
    };

    const svg = d3
      .select(ref.current)
      .append('svg')
      .attr('width', map_config.width)
      .attr('height', map_config.height)
      .attr('id', 'world-map-svg');
    svgRef.current = svg.node() as SVGSVGElement;
    gRef.current = svg.append('g').node() as SVGGElement;

    //  Zoom controls
    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([1, 8])
      .on('zoom', (event) => {
        d3.select(gRef.current).attr('transform', event.transform);
      });
    svg.call(zoom);

    // Initial leftward offset (same as zoomOut min)
    const offsetX = -50;
    svg.call(zoom.transform, d3.zoomIdentity.translate(offsetX, 0));

    window.zoomIn = () => {
      svg.transition().duration(400).call(zoom.scaleBy, 1.2);
    };
    window.zoomOut = () => {
      const svgNode = svg.node();
      if (!svgNode) return;
      const t = d3.zoomTransform(svgNode);
      const minScale = 1;
      if (t.k <= minScale + 0.01) {
        svg.transition().duration(400).call(zoom.transform, d3.zoomIdentity.translate(offsetX, 0));
      } else {
        svg
          .transition()
          .duration(400)
          .call(zoom.scaleBy, 1 / 1.2);
      }
    };
  }, []);

  // UPDATE COLORS AND DATA
  useEffect(() => {
    if (!svgRef.current || !gRef.current) return;

    const map_config = {
      data0: 'Entity',
      data1: 'Population',
      label0: 'label 0',
      label1: 'label 1',
      baseColor: '#CDD7E1',
      color0: '#EDF5FD',
      color1: '#185EA5',
      color2: '#0B6BCB',
      tooltipColor: '#616161E5',
      width: 1500,
      height: 650,
      max: 100,
      min: 0,
      format: ',.0f',
    };

    function valueFormat(d: number): string {
      return d3.format(map_config.format)(d);
    }

    d3.json('/data/world-topo-min.json').then((worldData) => {
      if (!worldData) return;
      const worldDataTyped = worldData as Topology<{
        countries: GeometryCollection<GeoJsonProperties>;
      }>;
      const countries = topojson.feature(
        worldDataTyped,
        worldDataTyped.objects.countries,
      ) as FeatureCollection<Geometry, GeoJsonProperties>;

      function normalize(str: string) {
        return str
          .toLowerCase()
          .replace(/republic|state|islands|the|of|,|\.|\(|\)|-/g, '')
          .replace(/\s+/g, '')
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '');
      }

      const filteredFeatures: Feature<Geometry, GeoJsonProperties>[] = countries.features
        .filter((d) => d.properties && d.properties.name !== 'Antarctica')
        .map((d) => {
          const topoName = normalize(d.properties?.name || '');
          const found = data.find((row) => {
            const dataName = normalize(row.country);
            return (
              dataName === topoName || dataName.includes(topoName) || topoName.includes(dataName)
            );
          });
          d.properties = {
            ...d.properties,
            population: found ? (found[year as keyof MapDataRow] as number) : 0,
            hasData: !!found,
          };
          return d;
        });
      countries.features = filteredFeatures;

      // CALCULATE min and max for legend
      let min = 0,
        max = 0;
      const validPopulations = countries.features
        .map((f) =>
          f.properties && typeof f.properties.population === 'number' && f.properties.population > 0
            ? f.properties.population
            : null,
        )
        .filter((v): v is number => v !== null);
      if (validPopulations.length > 0) {
        min = Math.min(...validPopulations);
        max = Math.max(...validPopulations);
      }
      setLegend({ min, max, color0: map_config.color0, color1: map_config.color1 });

      const projection = geoCylindricalStereographic()
        .center([20, 50])
        .rotate([-10, 0])
        .fitSize([map_config.width, map_config.height], countries);
      const path = d3.geoPath().projection(projection);

      // JOIN: UPDATE existing paths with new data
      const paths = d3
        .select(gRef.current)
        .selectAll<SVGPathElement, Feature<Geometry, GeoJsonProperties>>('path')
        .data(countries.features, (d) => {
          const feature = d as Feature<Geometry, GeoJsonProperties> | null;
          return feature?.properties?.name ?? '';
        });

      const colorScale = d3
        .scaleLog<string>()
        .domain([globalMinMax.min, globalMinMax.max])
        .range([map_config.color0, map_config.color1])
        .clamp(true);

      paths
        .transition()
        .duration(600)
        .attr('fill', (d: Feature<Geometry, GeoJsonProperties>) => {
          if (
            d.properties &&
            typeof d.properties.population === 'number' &&
            !isNaN(d.properties.population) &&
            d.properties.population > 0
          ) {
            return colorScale(d.properties.population);
          }
          return '#DDE7EE';
        });

      // UPDATE: TOOLTIP EVENTS
      paths
        .on('mousemove', function (event: MouseEvent, d: Feature<Geometry, GeoJsonProperties>) {
          if (!tooltipRef.current) return;
          Object.assign(tooltipRef.current.style, {
            display: 'block',
            left: `${event.clientX - 80}px`,
            top: `${event.clientY - 90}px`,
            background: '#616161E5',
            border: 'none',
            color: '#fff',
            padding: '8px',
            fontWeight: 'bold',
            textAlign: 'center',
            borderRadius: '8px',
            fontSize: '14px',
            boxShadow: '0 2px 8px rgba(67,147,228,0.12)',
            position: 'fixed',
            zIndex: 1000,
          });
          let htmlContent = '';
          if (d.properties?.hasData) {
            htmlContent += `<span style=\"display:block;font-weight:bold;\">${d.properties?.name ?? ''}</span>`;
            htmlContent += `<span style=\"display:block;font-weight:bold;\">$${valueFormat(d.properties.population)}M</span>`;
          } else {
            htmlContent += `<span style=\"display:block;font-weight:bold; color: #bdbdbd;\">${d.properties?.name ?? ''}</span>`;
            htmlContent += `<span style=\"display:block;font-weight:bold; color: #bdbdbd;\">No data available</span>`;
          }
          tooltipRef.current.innerHTML = htmlContent;
          let arrow = tooltipRef.current.querySelector('.tooltip-arrow');
          if (!arrow) {
            arrow = document.createElement('div');
            arrow.className = 'tooltip-arrow';
            tooltipRef.current.appendChild(arrow);
          }
          Object.assign((arrow as HTMLElement).style, {
            position: 'absolute',
            bottom: '-10px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '0',
            height: '0',
            borderLeft: '8px solid transparent',
            borderRight: '8px solid transparent',
            borderTop: '10px solid #616161E5',
            zIndex: '10',
          });
          d3.select(this).attr('fill', map_config.color2);
        })
        .on('mouseout', function () {
          if (!tooltipRef.current) return;
          tooltipRef.current.style.display = 'none';
          tooltipRef.current.style.background = 'rgba(255,255,255,0.97)';
          tooltipRef.current.style.border = '1px solid #4393E4';
          tooltipRef.current.style.color = '#171A1C';
          const d = d3.select(this).datum() as Feature<Geometry, GeoJsonProperties>;
          if (
            d.properties &&
            typeof d.properties.population === 'number' &&
            !isNaN(d.properties.population) &&
            d.properties.population > 0
          ) {
            d3.select(this).attr('fill', colorScale(d.properties.population));
          } else {
            d3.select(this).attr('fill', '#DDE7EE'); // gris para sin datos o 0
          }
        });

      // ENTER: ADD new paths
      paths
        .enter()
        .append('path')
        .attr('d', (d: Feature<Geometry, GeoJsonProperties>) => path(d) ?? '')
        .attr('fill', (d: Feature<Geometry, GeoJsonProperties>) => {
          if (
            d.properties &&
            typeof d.properties.population === 'number' &&
            !isNaN(d.properties.population) &&
            d.properties.population > 0
          ) {
            return colorScale(d.properties.population);
          }
          return '#DDE7EE';
        })
        .attr('stroke', '#fff')
        .on('mousemove', function (event: MouseEvent, d: Feature<Geometry, GeoJsonProperties>) {
          if (!tooltipRef.current) return;
          Object.assign(tooltipRef.current.style, {
            display: 'block',
            left: `${event.pageX - 133}px`,
            top: `${event.pageY - 330}px`,
            background: '#616161E5',
            border: 'none',
            color: '#fff',
            padding: '8px',
            fontWeight: 'bold',
            textAlign: 'center',
            borderRadius: '8px',
            fontSize: '14px',
            boxShadow: '0 2px 8px rgba(67,147,228,0.12)',
            position: 'absolute',
          });
          let htmlContent = '';
          htmlContent += `<span style=\"display:block;font-weight:bold;\">${d.properties?.name ?? ''}</span>`;
          if (d.properties?.hasData) {
            htmlContent += `<span style=\"display:block;font-weight:bold;\">$${valueFormat(d.properties.population)}M</span>`;
          } else {
            htmlContent += `<span style=\"display:block;font-weight:bold; color: #ff5252;\">No data available</span>`;
          }
          tooltipRef.current.innerHTML = htmlContent;
          let arrow = tooltipRef.current.querySelector('.tooltip-arrow');
          if (!arrow) {
            arrow = document.createElement('div');
            arrow.className = 'tooltip-arrow';
            tooltipRef.current.appendChild(arrow);
          }
          Object.assign((arrow as HTMLElement).style, {
            position: 'absolute',
            bottom: '-10px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '0',
            height: '0',
            borderLeft: '8px solid transparent',
            borderRight: '8px solid transparent',
            borderTop: '10px solid #616161E5',
            zIndex: '10',
          });
          d3.select(this).attr('fill', map_config.color2);
        })
        .on('mouseout', function () {
          if (!tooltipRef.current) return;
          tooltipRef.current.style.display = 'none';
          tooltipRef.current.style.background = 'rgba(255,255,255,0.97)';
          tooltipRef.current.style.border = '1px solid #4393E4';
          tooltipRef.current.style.color = '#171A1C';
          const d = d3.select(this).datum() as Feature<Geometry, GeoJsonProperties>;
          if (
            d.properties &&
            typeof d.properties.population === 'number' &&
            !isNaN(d.properties.population) &&
            d.properties.population > 0
          ) {
            d3.select(this).attr('fill', colorScale(d.properties.population));
          } else {
            d3.select(this).attr('fill', '#DDE7EE'); // gris para sin datos o 0
          }
        })
        .on('click', function (event: MouseEvent, d: Feature<Geometry, GeoJsonProperties>) {
          console.log(event);
          const drawerTitle = `${d.properties?.name} – Global Health Funding by Sectors and Sub-Sectors (USD Million)`;
          openDrawer(drawerTitle, <DrawerContent />);
        });
      paths.exit().remove();
      setIsMapReady(true);
    });
  }, [data, year, globalMinMax.max, globalMinMax.min, openDrawer]);

  return (
    <>
      <Box display="flex" justifyContent="end">
        <DropdownMenu value={year} options={years} onChange={setYear} />
      </Box>
      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          margin: 0,
          padding: 0,
          minHeight: 650,
        }}
      >
        <div
          id="world-map"
          ref={ref}
          className="world-map"
          style={{
            margin: 0,
            padding: 0,
            display: 'block',
            marginLeft: 100,
          }}
        />
        {/* Loader Overlay */}
        <Fade in={!isMapReady} timeout={400} unmountOnExit>
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: 650,
              background: 'rgba(224,224,224,0.95)',
              borderRadius: 16,
              zIndex: 100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
              transition: 'opacity 0.4s',
            }}
          >
            <div style={{ width: '80%', height: 600, borderRadius: 16, background: '#e0e0e0' }} />
          </div>
        </Fade>
        {/* Map UI (hidden while loading) */}
        {isMapReady && (
          <>
            <div
              ref={tooltipRef}
              style={{
                position: 'absolute',
                pointerEvents: 'none',
                background: 'rgba(255,255,255,0.97)',
                border: '1px solid #4393E4',
                boxShadow: '0 2px 8px rgba(67,147,228,0.12)',
                borderRadius: 8,
                padding: '10px 16px',
                fontSize: 16,
                color: '#171A1C',
                display: 'none',
                zIndex: 10,
                minWidth: 160,
                userSelect: 'none',
              }}
            />
            <MapLeyend legend={legend} />
            <div
              style={{
                position: 'absolute',
                bottom: 64,
                left: 66,
                zIndex: 20,
                display: 'flex',
                gap: 16,
              }}
            >
              <FloatingIconButton
                onClick={() => setIsPlaying((prev) => !prev)}
                title={isPlaying ? 'Stop Autoplay' : 'Autoplay'}
                icon={
                  !isPlaying ? (
                    <PlayArrow style={{ color: isPlaying ? '#0B6BCB' : undefined }} />
                  ) : (
                    <StopIcon style={{ color: isPlaying ? '#0B6BCB' : undefined }} />
                  )
                }
              />
              {isPlaying ? (
                <Fade in={isPlaying} timeout={400} unmountOnExit>
                  <div>
                    <YearSlider years={years} currentYear={year} onChange={setYear} />
                  </div>
                </Fade>
              ) : (
                <>
                  <Fade in={!isPlaying} timeout={400} unmountOnExit>
                    <div style={{ display: 'flex', gap: 16 }}>
                      <FloatingIconButton
                        onClick={() => (window as unknown as { zoomIn: () => void }).zoomIn()}
                        title="Zoom In"
                        icon={<ZoomInIcon />}
                      />
                      <FloatingIconButton
                        onClick={() => (window as unknown as { zoomOut: () => void }).zoomOut()}
                        title="Zoom Out"
                        icon={<ZoomOutIcon />}
                      />
                    </div>
                  </Fade>
                </>
              )}
            </div>
          </>
        )}
      </div>
      <FooterMap />
      <RightSideDrawer open={isOpen} headerText={headerText} onClose={closeDrawer}>
        {children}
      </RightSideDrawer>
    </>
  );
}
