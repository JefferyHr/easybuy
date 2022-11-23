<template>
    <div class="footer base-width">
        <ul class="w-full flex flex-row justify-around items-center border-0 border-b h-[80px] text-[#b0b0b0]">
            <li> <a href="javascript:void(0)"> 预约维修服务</a></li>
            <li> <a href="javascript:void(0)"> 7天无理由退货</a></li>
            <li> <a href="javascript:void(0)"> 15天免费换货</a></li>
            <li> <a href="javascript:void(0)"> 满69包邮</a></li>
            <li> <a href="javascript:void(0)"> 520余家售后网点</a></li>
        </ul>
        <div class="footer-site">
            <dl>
                <dt>帮助中心</dt>
                <dd>账户管理</dd>
                <dd>购物指南</dd>
                <dd>订单操作</dd>
            </dl>
            <dl>
                <dt>服务支持</dt>
                <dd>售后政策</dd>
                <dd>自助服务</dd>
                <dd>相关下载</dd>
            </dl>
            <dl>
                <dt>线下门店</dt>
                <dd>小米之家</dd>
                <dd>服务网点</dd>
                <dd>授权体验店/专区</dd>
            </dl>
            <dl>
                <dt>关于小米</dt>
                <dd>了解小米</dd>
                <dd>加入小米</dd>
                <dd>投资者关系</dd>
                <dd>企业社会责任</dd>
                <dd>廉洁举报</dd>
            </dl>
            <dl>
                <dt>关注我们</dt>
                <dd>新浪微博</dd>
                <dd>官方微信</dd>
                <dd>联系我们</dd>
                <dd>公益基金会</dd>
            </dl>
            <dl>
                <dt>特色服务</dt>
                <dd>F码通道</dd>
                <dd>礼物码</dd>
                <dd>防伪查询</dd>
            </dl>
            <div class="site-content">
                <span class="text-primaryColor text-[24px]">400-100-1234</span>
                <span class="text-[12px] text-[#b0b0b0] my-4">8:00-18:00（仅收市话费）</span>
                <span class="text-primaryColor text-[18px]">人工客服</span>
                <span class="text-[12px] text-[#b0b0b0] my-4">关注小米</span>
            </div>
        </div>
    </div>
    <div class="site-info base-width flex flex-row pt-20 bg-gray-100">
        <img src="../assets/img/logo.png" class="w-[56px] h-[56px]" alt="">
        <div class="info-text ml-20">
            <p class="sites">
                <a href="javascript:void(0)">小米商城</a>
                <span>|</span>
                <a href="javascript:void(0)">MIUI</a>
                <span>|</span>
                <a href="javascript:void(0)">米家</a>
                <span>|</span>
                <a href="javascript:void(0)">米聊</a>
                <span>|</span>
                <a href="javascript:void(0)">多看</a>
                <span>|</span>
                <a href="javascript:void(0)">游戏</a>
                <span>|</span>
                <a href="javascript:void(0)">蒸汽服务</a>
                <span>|</span>
                <a href="javascript:void(0)">小米天猫店</a>
                <span>|</span>
                <a href="javascript:void(0)">小米集团隐私政策</a>
                <span>|</span>
                <a href="javascript:void(0)">小米公司儿童信息保护规则</a>
                <span>|</span>
                <a href="javascript:void(0)">小米商城隐私政策</a>
                <span>|</span>
                <a href="javascript:void(0)">小米商城用户协议</a>
                <span>|</span>
                <a href="javascript:void(0)">问题反馈</a>
                <span>|</span>
                <a href="javascript:void(0)">Select Location</a>
            </p>
            <p class="sites">
                <span>&copy; mi.com</span>
                <a href="javascript:void(0)">京ICP证110507号</a>
                <a href="javascript:void(0)">京ICP备10046444号</a>
                <a href="javascript:void(0)">京公网安备1100802022123号</a>
                <a href="javascript:void(0)">京网文[2020]0276-042号</a>
            </p>
            <p class="sites">
                <span>（京）网械平台备字</span>
                <a href="javascript:void(0)">（2018）第00004号互联网药品信息服务资格证</a>
                <a href="javascript:void(0)">（京）-非经营性-2022-1234营业执照医疗器械质量公告</a>
            </p>
            <p class="sites">
                <a href="javascript:void(0)">增值电信业务许可证</a>
                <a href="javascript:void(0)">网络食品经营备案</a>
                <a href="javascript:void(0)">京食药网食备20221123</a>
                <a href="javascript:void(0)">食品经营许可证</a>
            </p>
            <p class="sites">
                <span>违法和不良信息举报电话：123-4567-1234</span>
                <a href="javascript:void(0)">知识产权侵权投诉</a>
                <span>本网站所列数据，除特殊说明，所有数据均是虚构</span>
            </p>
        </div>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.footer-site {
    @apply pt-[30px] flex flex-row justify-between
}

dt {
    @apply text-[14px] mb-20;

}

dd {
    @apply text-[12px] mb-10 text-[#b0b0b0]
}

.site-content {
    @apply flex flex-col items-center w-[260px] h-full border-0 border-l
}

.sites {
    @apply text-[#818181] text-[14px] flex flex-row items-center;

    a {
        @apply mx-2;

        &:hover {
            @apply text-primaryColor
        }
    }

    span {
        @apply text-[12px]
    }
}
</style>