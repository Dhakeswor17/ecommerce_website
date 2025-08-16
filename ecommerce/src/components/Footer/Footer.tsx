
import { Box, Typography, Container } from '@mui/material';
import './Footer.scss';

const Footer = () => {
  return (
    <Box component="footer" className="footer">
      <Container>
        <Typography variant="body2" align="center">
          © {new Date().getFullYear()} santosh OY. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}
export default Footer;