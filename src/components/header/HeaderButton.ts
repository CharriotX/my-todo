import { Button, styled } from "@mui/material";

type Props = {
    background?: string
}

export const HeaderButton = styled(Button)<Props>(({ background }) => ({
    minWidth: '110px',
    fontWeight: 'bold',
    boxShadow: '0 0 0 2px #50029d, 4px 4px 0 0 #50029d',
    borderRadius: '2px',
    textTransform: 'capitalize',
    margin: '0 10px',
    padding: '8px 24px',
    color: '#ffffff',
    background: background || '#7F00FF',
}))