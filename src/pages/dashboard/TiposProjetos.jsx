import { Helmet } from 'react-helmet';
import { Link, useNavigate } from "react-router-dom";

import {
    IconButton,
    Typography,
    Box,
    Tooltip
} from '@material-ui/core';

import { AddCircle } from '@material-ui/icons';
import useAxios from 'axios-hooks';
import Lista from 'components/lista/Lista'

const columnsModel = () => [
    { id: 'nome', numeric: false, disablePadding: false, label: 'Nome', style: { width: '100%' } },
];

const TiposProjetos = () => {
    const [{ data, loading, error }, refetch] = useAxios("tipos_projetos", { useCache: false });
    let navigate = useNavigate();

    if (error)
        return <Box
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
        </Box>;

    return (
        <Box display="flex" flexDirection="column" height="100%">
            <Helmet>
                <title>Tipos de projetos | Engelive</title>
            </Helmet>
            <Box display="flex" padding="2px">
                <Box flexGrow={1} paddingLeft="59px" display="flex" justifyContent="center">
                    <Typography variant="h4" color="primary" style={{ paddingTop: '5px' }}>
                        Tipos de projetos
                    </Typography>
                </Box>
                <Tooltip title="Novo">
                    <IconButton variant="contained" color="primary" component={Link} to="/app/tipoprojeto">
                        <AddCircle fontSize="large" />
                    </IconButton>
                </Tooltip>
            </Box>
            <Box flex={1}>
                <Lista
                    rows={data}
                    loading={loading}
                    columnsModel={columnsModel()}
                    onClickRow={(row) => navigate(`/app/tipoprojeto/${row.id}`)}
                />
            </Box>
            {/* <List>
                {data.map(tipoProjeto => (
                    <ListItem button key={tipoProjeto.id} component={Link} to={`/app/tipoprojeto/${tipoProjeto.id}`}>
                        <ListItemAvatar>
                            <Avatar>
                                <FolderIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={tipoProjeto.nome}
                        />
                        <ListItemSecondaryAction>
                            <IconButton edge="start" aria-label="edit" component={Link} to={`/app/tipoprojeto/${tipoProjeto.id}`} >
                                <EditIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List> */}
        </Box>
    );
}

export default TiposProjetos;