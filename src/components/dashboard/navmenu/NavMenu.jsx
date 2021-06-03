import NavMenuObra from './NavMenuObra';
import NavItem from './NavItem';
import { Sync } from '@material-ui/icons';
import { 
    Box, 
    IconButton, 
    Tooltip, 
    CircularProgress, 
    FormHelperText 
} from '@material-ui/core';
import useAxios from 'axios-hooks';

const NavMenu = () => {
    const [{ data, loading, error }, refetch] = useAxios("menu", { useCache: false });

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
            }}
        >
            {error &&
                <FormHelperText error>
                    {error}
                </FormHelperText>}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row'
                }}
            >
                <NavItem
                    href={`/app/obras`}
                    title="Obras"
                />
                {loading ?
                    <IconButton>
                        <CircularProgress size={24} />
                    </IconButton>
                    :
                    <Tooltip title="Atualizar obras">
                        <IconButton variant="contained" color="primary" onClick={refetch}>
                            <Sync />
                        </IconButton>
                    </Tooltip>
                }
            </Box>
            {data && data.map((obra) => (
                <NavMenuObra key={`obra${obra.id}`} obra={obra} />
            ))}
            <Box sx={{ flexGrow: 1 }} />
            <NavItem
                href={`/app/tiposprojetos`}
                title="Tipos de projetos"
            />
        </Box>
    );
};

export default NavMenu;
