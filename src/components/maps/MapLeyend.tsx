import { Grid, Typography } from '@mui/material';
import * as d3 from 'd3';

export default function MapLeyend({
  legend,
}: {
  legend: { min?: number; max?: number; color0: string; color1: string };
}) {
  return (
    <Grid
      style={{
        position: 'absolute',
        left: 16,
        bottom: 64 + 48 + 24,
        zIndex: 30,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 0,
      }}
    >
      <Typography fontWeight={400} color="#636B74" width={120} textAlign="center">
        {legend.max ? d3.format('$,')(legend.max) + ' M' : '200M'}
      </Typography>
      <Typography fontWeight={600} color="#636B74">
        High
      </Typography>
      <Grid
        style={{
          width: 19,
          height: 236,
          background: `linear-gradient(180deg, ${legend.color1} 0%, ${legend.color0} 100%)`,
          margin: 0,
          position: 'relative',
        }}
      />
      <Typography fontWeight={600} color="#636B74">
        Low
      </Typography>
      <Typography fontWeight={400} color="#636B74" width={120} textAlign="center">
        {legend.min ? d3.format('$,')(legend.min) + ' M' : '0'}
      </Typography>
    </Grid>
  );
}
