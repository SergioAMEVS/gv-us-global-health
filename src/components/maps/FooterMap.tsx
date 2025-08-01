import { Divider, Grid, Typography } from '@mui/material';

export default function FooterMap() {
  return (
    <Grid mt={4} ml={4} width={'90%'}>
      <Grid ml={5} my={2}>
        <Typography fontSize={14} color="#00000099">
          Data Source: OECD Data Explorer, CRS: Creditor Reporting System (flows) [cloud replica]
        </Typography>
      </Grid>
      <Divider style={{ margin: '8px 0', backgroundColor: '#dddee0', height: '2px' }} />
      <Grid ml={5}>
        <Typography fontSize={14} color="#555E68" fontWeight={500}>
          Last updated: April 2025
        </Typography>
      </Grid>
      <Divider style={{ margin: '8px 0', backgroundColor: '#dddee0', height: '2px' }} />
    </Grid>
  );
}
