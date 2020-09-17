export default{
    path:"/video",
    component:()=>import("@/views/video/video"),
    children:[
        {
            path:"mvdb",
            component:()=>import("@/views/video/indexComponents/MvDatabase")
        },
        {
            path:"detail/:mvid",
            components:{
                detail:()=>import("@/views/video/indexComponents/MvDetail")
            },
        },
        {
            path:"/video",
            redirect:"/video/mvdb"
        }
    ]

}