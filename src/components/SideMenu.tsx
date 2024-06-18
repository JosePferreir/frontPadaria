"use client";
import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import HomeIcon from '@mui/icons-material/Home';
import InventoryIcon from '@mui/icons-material/Inventory';
import StoreIcon from '@mui/icons-material/Store';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Box, Toolbar } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import {laranja} from '@/style/theme';
import { useRouter} from 'next/navigation';
import StorefrontIcon from '@mui/icons-material/Storefront';

const SideMenu: React.FC = () => {
  const [open, setOpen] = React.useState<string | null>(null);
  const router = useRouter();

  const handleClick = (item: string) => {
    setOpen(open === item ? null : item);
  };

  const goTo = async (page:string) => {
    router.push(page);
  };

  return (
    <ThemeProvider theme={laranja}>
        <Drawer
            variant="permanent"
            sx={{
                width: 240,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
            }}
        >
            <Toolbar/>
            <Box sx={{ overflow: 'auto' }}>
                <List>
                    <ListItem button onClick={() => goTo('/')}>
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Menu inicial" />
                    </ListItem>
                    <Divider />
                    <ListItem button onClick={() => handleClick('materiaPrima')}>
                        <ListItemIcon>
                            <InventoryIcon />
                        </ListItemIcon>
                        <ListItemText primary="Matéria-prima" />
                        {open === 'materiaPrima' ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={open === 'materiaPrima'} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem button sx={{ pl: 4 }} onClick={() => goTo('/materia-prima/gerenciar')}>
                                <ListItemText primary="Gerenciar" />
                            </ListItem>
                            <ListItem button sx={{ pl: 4 }} onClick={() => goTo('/materia-prima/estoque')}>
                                <ListItemText primary="Estoque" />
                            </ListItem>
                        </List>
                    </Collapse>
                    <ListItem button onClick={() => handleClick('produtos')}>
                        <ListItemIcon>
                            <StorefrontIcon />
                        </ListItemIcon>
                        <ListItemText primary="Produtos" />
                        {open === 'produtos' ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={open === 'produtos'} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem button sx={{ pl: 4 }}>
                                <ListItemText primary="Gerenciar" />
                            </ListItem>
                            <ListItem button sx={{ pl: 4 }}>
                                <ListItemText primary="Estoque" />
                            </ListItem>
                        </List>
                    </Collapse>
                    <ListItem button>
                        <ListItemIcon>
                            <ShoppingCartIcon />
                        </ListItemIcon>
                        <ListItemText primary="Compras" />
                    </ListItem>
                </List>
            </Box>
                
        </Drawer>
    </ThemeProvider>

  );
};

export default SideMenu;