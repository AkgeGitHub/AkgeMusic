export default{
    path:"/songlist",
    component:()=>import("@/views/songlist/songlist"),
    children:[
        {
            path:"detail/:playid/songs",
            component:()=>import("@/views/songlist/indexComponents/Songs")
        },
        {
            path:"detail/:playid/comment",
            component:()=>import("@/views/songlist/indexComponents/Comment")
        },
        {
            path:"detail/:playid",
            redirect:"detail/:playid/songs"
        }
    ]

}