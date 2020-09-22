export default{
    path:"/search",
    component:()=>import("@/views/search"),
    children:[
        {
            path:"detail/:keywords",
            component:()=>import("@/views/search")
        },
    ]
}