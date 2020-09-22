export default{
    path:"/playlist",
    component:()=>import("@/views/playlist"),
    children:[
        {
            path:"detail/:playid/",
            component:()=>import("@/views/playlist")
        },
    ]

}