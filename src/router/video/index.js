export default{
    path:"/video",
    component:()=>import("@/views/video/video"),
    children:[
        {
            path:"videodb",
            component:()=>import("@/views/video/indexComponents/VideoDatabase")
        },
        {
            path:"mvdb",
            component:()=>import("@/views/video/indexComponents/MvDatabase")
        },
        {
            path:"/video",
            redirect:"/video/videodb"
        }
    ]

}