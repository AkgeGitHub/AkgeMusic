export default{
    path:"/video",
    component:()=>import("@/views/video/video"),
    children:[
        {
            path:"mvdb",
            component:()=>import("@/views/video/indexComponents/MvDatabase")
        },
        {
            path:"/video",
            redirect:"/video/mvdb"
        }
    ]

}