import dash from '../../assets/blue.png'
import check from '../../assets/check.png'
import people from '../../assets/youth.png'
import clock from '../../assets/wall-clock.png'
import chat from '../../assets/chat.png'
import link from '../../assets/link.png'

export const navItems = [
    {
      path: "/app/dashboard",
      name: "Dashboard",
      img: dash,
      newTab: false

    },
    {
      path: "/app/vacancies",
      name: "Vacancies",
      img: check,
      newTab: false

    },
    {
      path: "/app/candidates",
      name: "Candidates",
      img: people,
      newTab: false

    },
    {
      path: "/app/schedules",
      name: "Schedules",
      img: clock,
      newTab: false
    },
    {
        path: "/app/employees",
        name:"Employees",
        img: people,
        newTab: false

    },
    {
        path: "/app/chat",
        name: "Chat",
        img: chat,
        newTab: false

    },
    {
        path:"/jobs",
        name: "Jobs",
        img: link,
        newTab: true
    }
];


export const linkStyle = {
    borderRadius: '0.375rem',
    fontSize: '0.875rem',
    transition: 'all 0.3s ease-in',
    textDecoration: 'none',
};
  
export const activeLinkStyle = {
    color: '#f4f4f4',
};
  
export const navbarStyle = {
    border: '1px solid #a3938c',
    borderRadius: '0.4rem',
    padding: '0.4rem',
    marginBottom: '12px',
    top: '4px',
    zIndex: '100',
    backgroundColor: 'rgba(51, 51, 51, 0.8)',
    backdropFilter: 'blur(8px)',
};
  
export const bottomBarStyle = {
    bottom: '0',
    left: '0',
    height: '100%',
    backgroundColor: '#2A2B2D',
    zIndex: '-10',
    padding:'4px',
    paddingLeft: '16px', 
    width:'80%', 
    justifyContent:'start',
    borderRadius:'10px', 
    alignItems:'center'
    
};