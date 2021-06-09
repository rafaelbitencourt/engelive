import { Box, Typography } from '@material-ui/core';

const Error = ({error}) => <Box
    height='100%'
    width='100%'
    sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }}
>
    <Typography
        align="center"
        color="textPrimary"
        variant="h3"
    >
        {error}
    </Typography>
</Box>

export default Error;