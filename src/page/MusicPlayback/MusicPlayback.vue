<template>
    <div class="MusicPlayback connect" element-loading-text="加载中..." :element-loading-svg="svg" v-loading="loading">
        <template v-if="musicList.length">
            <div class="music_top">
                <div class="music_left">
                    <el-table :data="musicList" class="music-table" style="width: 100%;height: 100%;">
                        <el-table-column prop="musicName" label="歌曲" />
                        <el-table-column prop="singer" label="歌手">
                            <template #default="scope">
                                <el-space>
                                    <el-avatar :size="50" :src="scope.row.img" />
                                    {{ scope.row.singer }}
                                </el-space>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作">
                            <template #default="scope">
                                <el-tooltip class="box-item" effect="dark" content="播放" placement="top">
                                    <i ref="musiczantingRef"
                                        :class="`iconfont ${(musicIndex === scope.$index) ? `${bofangFlag ? 'icon-zanting' : 'icon-bofang'}` : 'icon-bofang'}`"
                                        @click="(_) => bofang(_, scope.$index)" />
                                </el-tooltip>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="music_right">
                    <img :src="musicList[musicIndex]?.img" style="width:100%;" alt="">
                    <h4>歌曲名：{{ musicList[musicIndex]?.musicName }}</h4>
                    <p>歌手：{{ musicList[musicIndex]?.singer }}</p>
                </div>
            </div>
            <div class="music_bottom">
                <i class="iconfont icon-shangyishou" @click="propMusic" />
                <i :class="`iconfont ${bofangFlag ? 'icon-zanting' : 'icon-bofang'}`"
                    @click="(_) => bofang(_, musicIndex)" />
                <i class="iconfont icon-xiayishou" @click="nextMusic" />
                <div class="music-slider-box">
                    <div class="music-slider-box-connect">
                        <span>{{ musicList[musicIndex]?.musicName }} - {{ musicList[musicIndex]?.singer }}</span>
                        <span>{{ startTime }}/{{ endTime }}</span>
                    </div>
                    <el-slider :format-tooltip="formatTooltip" :max="maxTime" :min="minTime"
                        @change="onChangeMusicSliderEl" class="music-slider" v-model="value" />
                </div>
                <el-tooltip class="box-item" effect="dark" content="顺序播放" placement="top">
                    <i v-show="PlaybackMode === 1" @click="setPlaybackMode" class="iconfont icon-shunxubofang" />
                </el-tooltip>
                <el-tooltip class="box-item" effect="dark" content="随机播放" placement="top">
                    <i v-show="PlaybackMode === 2" @click="setPlaybackMode" class="iconfont icon-suijibofang" />
                </el-tooltip>
                <el-tooltip class="box-item" effect="dark" content="单曲循环" placement="top">
                    <i v-show="PlaybackMode === 3" @click="setPlaybackMode" class="iconfont icon-danquxunhuan" />
                </el-tooltip>
                <i class="iconfont icon-xihuan" />
                <i class="iconfont icon-xiazai" />
                <i class="iconfont icon-pinglun" />
                <i class="iconfont icon-shengyin" />
            </div>
        </template>
        <el-empty class="video-empty" v-else description="暂无音乐" />
        <audio @timeupdate="onMusicTimerEl" ref="musicRef"
            :src="`${'http://127.0.0.1:9000' + musicList[musicIndex]?.music}`"></audio>
    </div>
    <!-- musicIndex -->
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, toRefs, watch } from 'vue'
import { MusicPlayback } from '@/stores';
import type { MusicListType } from "@/mock/index.static";
export default defineComponent({
    setup() {
        const {
            state,
            svg,
            init,
            onChangeMusicSlider,
            changeTime,
            formatTooltip,
            onMusicTimer,
            setPlaybackMode
        } = MusicPlayback();
        const musicRef = ref<any>(null);

        onMounted(async () => {
            await init();
            state.endTime = changeTime(musicRef.value.duration);
            state.maxTime = musicRef.value.duration;
        });

        const onChangeMusicSliderEl = (value: number) => {
            musicRef.value.currentTime = value;
            musicRef.value.play();
            state.bofangFlag = true;
            // onChangeMusicSlider(value);
        }

        const onMusicTimerEl = () => {
            state.endTime = changeTime(musicRef.value.duration);
            state.maxTime = musicRef.value.duration;
            state.startTime = changeTime(musicRef.value.currentTime);
            state.value = musicRef.value.currentTime;
            if (state.value > -1 && state.maxTime && !(state.value < state.maxTime)) {
                onMusicTimer();
                setTimeout(() => {
                    musicRef.value.play();
                }, 500);
            }
        }

        const bofang = async (e: { target: { className: string; }; }, index?: number) => {
            if (e.target.className === "iconfont icon-bofang el-tooltip__trigger el-tooltip__trigger" || e.target.className === "iconfont icon-bofang") {
                state.bofangFlag = true;
                state.musicIndex = index ? index : state.musicIndex;
                setTimeout(() => {
                    musicRef.value.play();
                }, 500);
            } else {
                state.bofangFlag = false;
                setTimeout(() => {
                    musicRef.value.pause();
                }, 500);
            }
        }

        const nextMusic = () => {
            onMusicTimer("next");
            setTimeout(() => {
                musicRef.value.play();
            }, 500);
        }

        const propMusic = () => {
            onMusicTimer("prop");
            setTimeout(() => {
                musicRef.value.play();
            }, 500);
        }

        return {
            ...toRefs(state),
            svg, bofang, musicRef, onChangeMusicSlider,
            formatTooltip, onMusicTimerEl, onChangeMusicSliderEl, nextMusic, propMusic, setPlaybackMode
        }
    }
})
</script>

<style  lang="less">
@import "./MusicPlayback.less";
</style>