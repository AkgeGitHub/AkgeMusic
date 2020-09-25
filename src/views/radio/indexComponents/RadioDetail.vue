<template>
  <div>
        <div class="radio-des">
            <div class="des-cover">
                <img :src="djDetail.picUrl" alt="">
            </div>
            <div class="des-cont">
                <div class="cont-name">{{djDetail.name}}</div>
                <div class="cont-info">
                    <div class="info-creator">
                        <img :src="djDetail.dj.avatarUrl" alt="">
                        <div>{{djDetail.dj.nickname}}</div>
                        <div>{{djDetail.createTime | time}} 创建</div>
                    </div>
                    <div class="info-brief" :title="djDetail.desc">
                        {{djDetail.desc}}
                    </div>
                </div>
                <div class="cont-btn">
                    <div>
                        <i class="far fa-play-circle"></i>
                        全部播放
                    </div>
                    <div>
                        <i class="far fa-heart"></i>
                        收藏
                    </div>
                    <div>
                        <i class="far fa-share-square"></i>
                        分享
                    </div>
                </div>

            </div>
        </div>
        <ProgramsList :programsList='RadioSongList'></ProgramsList>

    </div>
</template>

<script>
import ProgramsList from "@/views/radio/components/ProgramsList"
export default {
    data(){
        return{
            djDetail:{},
            RadioSongList:[],
            showIndex:0,
            activeIndex:0

        }
    },
    components:{
        ProgramsList
    },
    methods:{
        getRadioDetail(){
            // 获取电台详情
            this.axios.get("/dj/detail?rid="+this.djId).then((res)=>{ 
                if (res.data.code===200) {
                    this.djDetail=res.data.djRadio
                }else{
                    console.log("请求数据失败")
                }
            })
            // 获取电台节目
            this.axios.get("/dj/program?rid="+this.djId+"&asc=true").then((res)=>{
                this.RadioSongList=res.data.programs
            })
            
        },
	},
	computed:{
		djId(){
			return this.$route.params.djid
		}
	},
	mounted(){
        this.getRadioDetail()
	},
	watch:{
        $route(newvalue){
            if (newvalue) {
                this.getRadioDetail()
            }
        }
    }
}
</script>
    
<style scoped>
    .radio-des{display: flex;}
    .radio-des .des-cover{width: 170px;height: 170px;overflow: hidden;flex-shrink: 0;}
    .radio-des .des-cover img{width: 170px;height: 170px;border-radius: 10px;}
    .radio-des .des-cont{margin-left: 20px;height: 170px;display: flex;flex-direction: column;justify-content: space-between;}
    .radio-des .des-cont .cont-name{font-size: 24px;font-weight: bold; overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
    .radio-des .des-cont .cont-info{margin-top: 15px;}
    .radio-des .des-cont .cont-info .info-creator{display: flex;flex-wrap: wrap;line-height: 40px;}
    .radio-des .des-cont .cont-info .info-creator img{width: 40px;height: 40px;border-radius: 50%;overflow: hidden;}
    .radio-des .des-cont .cont-info .info-creator div{margin-left: 10px;font-size: 13px;color: rgb(159,159,159);}
    .radio-des .des-cont .cont-info .info-brief{width: 1000px; font-size: 14px;margin: 10px 0px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;}
    .radio-des .des-cont .cont-btn{display: flex;flex-wrap: wrap;margin-bottom: 5px;}
    .radio-des .des-cont .cont-btn div{width: 110px;height: 35px;color: rgb(41, 40, 40); background: rgb(219,219,219);text-align: center;line-height: 35px;border-radius: 20px;margin-right: 10px;font-size: 14px;}
	.radio-des .des-cont .cont-btn div i{margin-right: 4px;}
	.radio-cont .cont-nav{display: flex;flex-wrap: wrap;overflow: hidden;margin-top: 20px;justify-content: space-between;}
    .radio-cont .cont-nav .nav-left{display: flex;flex-wrap:wrap; overflow: hidden;font-size: 14px;}
    .radio-cont .cont-nav .nav-left a{display: block; height: 32px;margin-right: 50px;line-height: 32px;}
    .radio-cont .cont-nav .nav-left a.active{color: rgb(30, 208, 160);border-bottom: 1px solid rgb(30, 208, 160);}
    .radio-cont .cont-nav .nav-right{display: flex;flex-wrap: wrap;overflow: hidden;font-size: 13px;}
    .radio-cont .cont-nav .nav-right div{height: 36px;margin-left: 30px;line-height: 36px;}
</style>