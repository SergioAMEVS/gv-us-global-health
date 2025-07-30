'use client';
import { useEffect, useRef, useState } from 'react';
import type { FeatureCollection, Feature, GeoJsonProperties, Geometry } from 'geojson';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import { PlayArrow } from '@mui/icons-material';
import FloatingIconButton from '../ui/FloatingIconButton';
import type { Topology, GeometryCollection } from 'topojson-specification';
import MapLeyend from './MapLeyend';
import type { MapDataRow } from '@/data/mapData';

type WorldMapProps = {
  data: MapDataRow[];
  year: string;
};

export default function WorldMap({ data, year }: WorldMapProps) {
  // Estado para la leyenda
  const [legend, setLegend] = useState<{
    min: number;
    max: number;
    color0: string;
    color1: string;
  }>({ min: 0, max: 0, color0: '#CDD7E1', color1: '#97C3F0' });
  const ref = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const zoomLevel = useRef(1);
  const zoomTransform = useRef(d3.zoomIdentity);
  const autoplayInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.innerHTML = '';
    if (tooltipRef.current) tooltipRef.current.innerHTML = '';

    const map_config = {
      data0: 'Entity',
      data1: 'Population',
      label0: 'label 0',
      label1: 'label 1',
      color0: '#CDD7E1',
      color1: '#97C3F0',
      color2: '#0B6BCB',
      tooltipColor: '#616161E5',
      width: 1500,
      height: 650,
      max: 100,
      min: 0,
      format: ',.0f',
    };
    const COLOR_COUNTS = 200;

    function Interpolate(start: number, end: number, steps: number, count: number): number {
      return Math.floor(start + ((end - start) / steps) * count);
    }

    class Color {
      r: number;
      g: number;
      b: number;
      constructor(r: number, g: number, b: number) {
        this.r = r;
        this.g = g;
        this.b = b;
      }
      getColors() {
        return { r: this.r, g: this.g, b: this.b };
      }
    }

    function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
          }
        : null;
    }

    function valueFormat(d: number): string {
      return d3.format(map_config.format)(d);
    }

    const COLOR_FIRST = map_config.color0,
      COLOR_LAST = map_config.color1;
    let rgb = hexToRgb(COLOR_FIRST);
    if (!rgb) throw new Error(`Invalid color: ${COLOR_FIRST}`);
    const COLOR_START = new Color(rgb.r, rgb.g, rgb.b);
    rgb = hexToRgb(COLOR_LAST);
    if (!rgb) throw new Error(`Invalid color: ${COLOR_LAST}`);
    const COLOR_END = new Color(rgb.r, rgb.g, rgb.b);
    const startColors = COLOR_START.getColors(),
      endColors = COLOR_END.getColors();
    const colors = [];
    for (let i = 0; i < COLOR_COUNTS; i++) {
      colors.push(
        new Color(
          Interpolate(startColors.r, endColors.r, COLOR_COUNTS, i),
          Interpolate(startColors.g, endColors.g, COLOR_COUNTS, i),
          Interpolate(startColors.b, endColors.b, COLOR_COUNTS, i),
        ),
      );
    }
    // color2 para tooltip
    // const tooltipColor = map_config.tooltipColor;

    const svg = d3
      .select(ref.current)
      .append('svg')
      .attr('width', map_config.width)
      .attr('height', map_config.height)
      .attr('id', 'world-map-svg');
    // svgRef.current = svg.node() as SVGSVGElement;

    d3.json('/data/world-topo-min.json').then((worldData) => {
      if (!worldData) return;
      // Tipar correctamente el resultado de topojson.feature
      const worldDataTyped = worldData as Topology<{
        countries: GeometryCollection<GeoJsonProperties>;
      }>;
      const countries = topojson.feature(
        worldDataTyped,
        worldDataTyped.objects.countries,
      ) as FeatureCollection<Geometry, GeoJsonProperties>;

      // Fuzzy normalization for country names
      function normalize(str: string) {
        return str
          .toLowerCase()
          .replace(/republic|state|islands|the|of|,|\.|\(|\)|-/g, '')
          .replace(/\s+/g, '')
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, ''); // remove accents
      }

      const filteredFeatures: Feature<Geometry, GeoJsonProperties>[] = countries.features
        .filter((d) => d.properties && d.properties.name !== 'Antarctica')
        .map((d) => {
          const topoName = normalize(d.properties?.name || '');
          // Fuzzy match: exact, includes, or included in
          const found = data.find((row) => {
            const dataName = normalize(row.country);
            return (
              dataName === topoName || dataName.includes(topoName) || topoName.includes(dataName)
            );
          });
          if (!found) {
            console.log('No match for:', d.properties?.name);
          }
          d.properties = {
            ...d.properties,
            population: found ? (found[year as keyof MapDataRow] as number) : 0,
            hasData: !!found,
          };
          return d;
        });
      countries.features = filteredFeatures;

      // Calcular min y max para la leyenda
      // Only use countries with population > 0 for min/max
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

      const projection = d3
        .geoEquirectangular()
        .center([20, 50])
        .rotate([-10, 0])
        .fitSize([map_config.width, map_config.height], countries);
      const path = d3.geoPath().projection(projection);

      if (countries.features.length > 0) {
        svg
          .selectAll('path')
          .data(countries.features)
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
              if (max === min) {
                // Solo un país con datos, usa color1
                return map_config.color1;
              }
              const minLog = Math.log(min);
              const maxLog = Math.log(max);
              const valueLog = Math.log(d.properties.population);
              const norm = (valueLog - minLog) / (maxLog - minLog);
              const r = Math.round(startColors.r + (endColors.r - startColors.r) * norm);
              const g = Math.round(startColors.g + (endColors.g - startColors.g) * norm);
              const b = Math.round(startColors.b + (endColors.b - startColors.b) * norm);
              return `rgb(${r},${g},${b})`;
            }
            return map_config.color0;
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
            htmlContent += `<span style="display:block;font-weight:bold;">${d.properties?.name ?? ''}</span>`;

            if (d.properties?.hasData) {
              htmlContent += `<span style="display:block;font-weight:bold;">$${valueFormat(d.properties.population)}M</span>`;
            } else {
              htmlContent += `<span style="display:block;font-weight:bold; color: #ff5252;">No data available</span>`;
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
              if (max === min) {
                d3.select(this).attr('fill', map_config.color1);
              } else {
                // log-scale
                const minLog = Math.log(min);
                const maxLog = Math.log(max);
                const valueLog = Math.log(d.properties.population);
                const norm = (valueLog - minLog) / (maxLog - minLog);
                const r = Math.round(startColors.r + (endColors.r - startColors.r) * norm);
                const g = Math.round(startColors.g + (endColors.g - startColors.g) * norm);
                const b = Math.round(startColors.b + (endColors.b - startColors.b) * norm);
                d3.select(this).attr('fill', `rgb(${r},${g},${b})`);
              }
            } else {
              d3.select(this).attr('fill', map_config.color0);
            }
          });
      }

      const zoom = d3
        .zoom<SVGSVGElement, unknown>()
        .scaleExtent([1, 8])
        .filter((event: WheelEvent | MouseEvent | TouchEvent) => event.type !== 'wheel')
        .on('zoom', (event: d3.D3ZoomEvent<SVGSVGElement, unknown>) => {
          svg.selectAll('g').attr('transform', event.transform.toString());
          svg.selectAll('path').attr('transform', event.transform.toString());
          zoomTransform.current = event.transform;
        });

      // Ahora sí puedes llamar a .call usando el tipo correcto:
      (svg as d3.Selection<SVGSVGElement, unknown, null, undefined>).call(
        (zoom as unknown as d3.ZoomBehavior<SVGSVGElement, unknown>).transform,
        d3.zoomIdentity.scale(zoomLevel.current),
      );

      const handleZoom = (factor: number) => {
        zoomLevel.current = Math.max(1, Math.min(8, zoomLevel.current * factor));
        (svg as unknown as d3.Selection<SVGSVGElement, unknown, null, undefined>)
          .transition()
          .duration(400)
          .call(
            (zoom as d3.ZoomBehavior<SVGSVGElement, unknown>).transform,
            d3.zoomIdentity.scale(zoomLevel.current),
          );
      };

      const startAutoplay = () => {
        let direction = 1;
        autoplayInterval.current = setInterval(() => {
          if (zoomLevel.current >= 8) direction = -1;
          if (zoomLevel.current <= 1) direction = 1;
          handleZoom(direction > 0 ? 1.2 : 1 / 1.2);
        }, 1200);
      };
      const stopAutoplay = () => {
        if (autoplayInterval.current) clearInterval(autoplayInterval.current);
      };

      (
        window as unknown as {
          zoomIn: () => void;
          zoomOut: () => void;
          startAutoplay: () => void;
          stopAutoplay: () => void;
        }
      ).zoomIn = () => handleZoom(1.2);
      (
        window as unknown as {
          zoomIn: () => void;
          zoomOut: () => void;
          startAutoplay: () => void;
          stopAutoplay: () => void;
        }
      ).zoomOut = () => handleZoom(1 / 1.2);
      (
        window as unknown as {
          zoomIn: () => void;
          zoomOut: () => void;
          startAutoplay: () => void;
          stopAutoplay: () => void;
        }
      ).startAutoplay = startAutoplay;
      (
        window as unknown as {
          zoomIn: () => void;
          zoomOut: () => void;
          startAutoplay: () => void;
          stopAutoplay: () => void;
        }
      ).stopAutoplay = stopAutoplay;
    });

    return () => {
      const refNode = ref.current;
      const tooltipNode = tooltipRef.current;
      if (refNode) d3.select(refNode).selectAll('*').remove();
      if (tooltipNode) tooltipNode.innerHTML = '';
    };
  }, [data, year]);

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        margin: 0,
        padding: 0,
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
        }}
      />
      <MapLeyend legend={legend} />
      <div
        style={{
          position: 'absolute',
          bottom: 64,
          left: 32,
          zIndex: 20,
          display: 'flex',
          gap: 16,
        }}
      >
        <FloatingIconButton
          onClick={() => (window as unknown as { startAutoplay: () => void }).startAutoplay()}
          title="Autoplay Zoom"
          icon={<PlayArrow />}
        />
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
    </div>
  );
}
