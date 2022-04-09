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
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import { useRouter } from "next/router";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import { Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { useTheme } from "@mui/styles";

export const drawerWidth = 240;

export default function Menu({ ual }) {
  const router = useRouter();
  const theme = useTheme();
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: theme.palette.primary.main,
        },
        [`& .MuiListItemIcon-root`]: { color: theme.palette.colors.white },
        [`& .MuiTypography-root`]: { color: theme.palette.colors.white },
      }}
    >
      <Box>
        <List>
          <ListItem
            button
            key={"Avatar"}
            onClick={() => {
              if (ual.activeUser) {
                router.push("/user/" + ual.activeUser.accountName);
              } else {
                router.push("/login");
              }
            }}
          >
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
          <ListItem
            button
            key={"Home"}
            onClick={() => {
              router.push("/");
            }}
          >
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={"Home"} />
          </ListItem>
          {ual.activeUser && (
            <ListItem
              button
              key={"Create proposal"}
              onClick={() => {
                router.push("/proposal");
              }}
            >
              <ListItemIcon>
                <HowToVoteIcon />
              </ListItemIcon>
              <ListItemText primary={"Create proposal"} />
            </ListItem>
          )}
        </List>
        <Divider />
        <List>
          <ListItem
            button
            key={"User guide"}
            onClick={() => {
              router.push("/guide");
            }}
          >
            <ListItemIcon>
              <ContactSupportIcon />
            </ListItemIcon>
            <ListItemText primary={"User guide"} />
          </ListItem>
          {ual.activeUser ? (
            <ListItem
              button
              key={"Logout"}
              onClick={() => {
                ual.logout();
                router.push("/login");
              }}
            >
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary={"Logout"} />
            </ListItem>
          ) : (
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
          )}
        </List>
      </Box>
    </Drawer>
  );
}
