<template>
    <div class="MusicPlayback connect" element-loading-text="加载中..." :element-loading-svg="svg" v-loading="loading">
        <template v-if="musicList.length">
            <div class="music_top">
                <div class="music_left">
                    <el-table :data="musicList" class="music-table" style="width: 100%;height: 100%;">
                        <el-table-column prop="musicName" label="歌曲" />
                        <el-table-column prop="singer" label="歌手" />
                        <el-table-column label="操作">
                            <template #default="scope">
                                <i v-show="!scope.bofangFlag" class="iconfont icon-bofang" @click="bofang(scope.bofangFlag)" />
                                <i v-show="scope.bofangFlag" class="iconfont icon-zanting" @click="zanting(scope.bofangFlag)" />
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="music_right">
                    111
                </div>
            </div>
            <div class="music_bottom">
                <i class="iconfont icon-shangyishou" />
                <!-- <i v-show="!bofangFlag" class="iconfont icon-bofang" @click="bofang" />
                <i v-show="bofangFlag" class="iconfont icon-zanting" @click="zanting" /> -->
                <i class="iconfont icon-xiayishou" />
                <el-slider class="music-slider" v-model="value" />
                <i v-show="false" class="iconfont icon-suijibofang" />
                <i class="iconfont icon-shunxubofang" />
                <i v-show="false" class="iconfont icon-danquxunhuan" />
                <i v-show="false" class="iconfont icon-xihuan1" />
                <i class="iconfont icon-xihuan" />
                <i class="iconfont icon-xiazai" />
                <i class="iconfont icon-pinglun" />
                <i class="iconfont icon-shengyin" />
            </div>
        </template>
        <el-empty class="video-empty" v-else description="暂无音乐" />
        <audio ref="musicRef" :src="`${'http://127.0.0.1:9000' + musicList[musicIndex]?.music}`"></audio>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, toRefs } from 'vue'
import { MusicPlayback } from '@/stores';
export default defineComponent({
    setup() {
        const {
            state,
            svg,
            onClickMusic,
            onChangeMusicIndex,
            init,
        } = MusicPlayback();
        const musicRef = ref<any>(null);
        onMounted(async () => {
            await init();
        })
        const bofang = (bofangFlag?:boolean) => {
            musicRef.value.play();
            state.bofangFlag = true;
        }

        const zanting = (bofangFlag?:boolean) => {
            musicRef.value.pause();
            state.bofangFlag = false;
        }

        return {
            ...toRefs(state),
            svg, bofang, musicRef, zanting
        }
    }
})
</script>

<style  lang="less">
@import "./MusicPlayback.less";
</style>