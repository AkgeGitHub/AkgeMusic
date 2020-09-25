export default{
    path:"/radio",
    component:()=>import("@/views/radio"),
    children:[
        {
            path:"radiostation",
            component:()=>import("@/views/radio/indexComponents/RadioStation")
        },
        {
            path:"detail/:djid",
            component:()=>import("@/views/radio/indexComponents/RadioDetail")
        },
        {
            path:"/radio",
            redirect:"/radio/radiostation"
        }
    ]

}