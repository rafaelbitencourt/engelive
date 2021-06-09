import { Box, CircularProgress } from '@material-ui/core';

const Loading = () => <Box
    height='100%'
    width='100%'
    sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }}
>
    <CircularProgress />
</Box>

export default Loading;