export default{
    path:"/video",
    component:()=>import("@/views/video"),
    children:[
        {
            path:"mvlibrary",
            component:()=>import("@/views/video/indexComponents/MvLibrary")
        },
        {
            path:"detail/:mvid",
            component:()=>import("@/views/video/indexComponents/MvDetail")
        },
        {
            path:"/video",
            redirect:"/video/mvlibrary"
        }
    ]

}