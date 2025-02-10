import { Button, ButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';

// Extiende ButtonProps para incluir la propiedad `component`
interface NavButtonProps extends ButtonProps {
    component?: React.ElementType;
    to?: string;
}

// Define el componente NavButton
const NavButton = styled(Button)<NavButtonProps>(() => ({
    color: '#fff',
    fontWeight: 600,
    '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
}));

export default NavButton;