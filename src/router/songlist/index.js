export default{
    path:"/songlist",
    component:()=>import("@/views/songlist/songlist"),
    children:[
        {
            path:"detail/:playid",
            component:()=>import("@/views/songlist/indexComponents/Detail")
        }
    ]

}