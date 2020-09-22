export default{
    path:"/radio",
    component:()=>import("@/views/radio"),
    children:[
        {
            path:"radiostation",
            component:()=>import("@/views/radio/indexComponents/RadioStation")
        },
        {
            path:"/radio",
            redirect:"/radio/radiostation"
        }
    ]

}