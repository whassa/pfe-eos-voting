import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import LogoutIcon from "@mui/icons-material/Logout";
import { useRouter } from "next/router";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";

export const drawerWidth = 240;

export default function Menu({ ual }) {
  const router = useRouter();
  console.log(ual);
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
      }}
    >
      <Box>
        <List>
          <ListItem button key={"home"}>
            <ListItemAvatar>
              <Avatar>
                <AccountCircleIcon />
              </Avatar>
            </ListItemAvatar>
            {ual.activeUser ? (
              <ListItemText primary={ual.activeUser.accountName} />
            ) : (
              <ListItemText primary="Anonymous" />
            )}
          </ListItem>
        </List>
      </Box>

      <Box sx={{ overflow: "auto" }}>
        <List>
          <ListItem button key={"home"}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={"home"} />
          </ListItem>
        </List>
        <Divider />
        {ual.activeUser ? (
          <List>
            <ListItem
              button
              key={"logout"}
              onClick={() => {
                ual.logout();
                router.push("/login");
              }}
            >
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary={"logout"} />
            </ListItem>
          </List>
        ) : (
          <List>
            <ListItem
              button
              key={"login"}
              onClick={() => {
                router.push("/login");
              }}
            >
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary={"login"} />
            </ListItem>
          </List>
        )}
      </Box>
    </Drawer>
  );
}
