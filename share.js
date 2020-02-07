//2018.1.16
var ishare = importShare();
var xdad = xdad || {};
//-------------------------------------------------------自定义分享内容
(function () {
	ishare.wxId = 'wxe08f06eed88a45d4';//微信 appid
	ishare.tbId = '';//手淘 appid
	var hrefs = window.location.href.split('?');
	ishare.url = hrefs[0].substr(0, hrefs[0].lastIndexOf('/') + 1);
	if (ibase.getQueryString("type") == "weimeiti"){
		ishare.url = ishare.url+"?type=weimeiti";
	}
	ishare.content = {
		link: ishare.url,
		image: "https://yun.neweasco.com/easco/vtour/img/hotpostimg/hot1.jpg",
		title:"至IN中国风，竟然来自紫禁城",
		friend: '快来一探究竟，你不知道的中国风',
		timeline: '快来一探究竟，你不知道的中国风'
	};
	console.log(ishare.content);
	ishare.wxSign();
	/*
	if(os.weixin){
		ishare.from=icom.getQueryString('from');
		ishare.from=ishare.from||'friend';
		ishare.from= ishare.from=='groupmessage' || ishare.from=='singlemessage' ? 'friend' : ishare.from;
		console.log('微信分享来源：'+ishare.from);
		ishare.wxSign();
	}//edn if
	else ishare.tbSign();*/
}());

function importShare() {
	var imonitor = window.imonitor || {};
	var share = {};
	share.wxSigned = false;
	share.tbSigned = false;
	share.tbLoaded = 0;

	//-------------------------------------------------------微信SDK验证
	share.wxSign = function () {

		// var ishttps = 'https:' == document.location.protocol ? true : false;
		// if (ishttps) {
		// 	// alert("这是一个https请求");
		// 	setHttpsApi()
		// } else {
		// 	// alert("这是一个http请求");
		// 	setHttpApi();
		// }


			$.get("https://yun.neweasco.com/jssdk.php", {  }, function (data) {
				ApiConfig(data)
			}, 'json');//end ajax

		function ApiConfig(data) {
			wx.config({
				debug: false,
				appId: data.appid,
				timestamp: data.timestamp,
				nonceStr: data.noncestr,
				signature: data.signature,
				jsApiList: [
					'checkJsApi',
					'onMenuShareTimeline',
					'onMenuShareAppMessage',
					'onMenuShareQQ',
					'onMenuShareWeibo',
					'hideMenuItems',
					'showMenuItems',
					'hideAllNonBaseMenuItem',
					'showAllNonBaseMenuItem',
					'translateVoice',
					'startRecord',
					'stopRecord',
					'onRecordEnd',
					'playVoice',
					'pauseVoice',
					'stopVoice',
					'uploadVoice',
					'downloadVoice',
					'chooseImage',
					'previewImage',
					'uploadImage',
					'downloadImage',
					'getNetworkType',
					'openLocation',
					'getLocation',
					'hideOptionMenu',
					'showOptionMenu',
					'closeWindow',
					'scanQRCode',
					'chooseWXPay',
					'openProductSpecificView',
					'addCard',
					'chooseCard',
					'openCard'
				]
			});//end wx.config
			share.wxSigned = true;//通过微信新SDK验证
			wx.ready(function () {
				wx.showOptionMenu();//用微信“扫一扫”打开，optionMenu是off状态，默认开启
				share.wxShare();
			});//end wx.ready
		}

	}//end func

	//-------------------------------------------------------微信分享函数
	share.wxShare = function () {
		if (share.wxSigned) {
			var sharelink = share.content.link;
			if (localStorage.openid) {
				sharelink = sharelink + (sharelink.indexOf('?') > 0 ? '&' : '?') + 'from_openid=' + localStorage.openid;
			}
			/*
			wx.onMenuShareTimeline({
				title: share.content.timeline, // 分享标题
				link: sharelink, // 分享链接
				imgUrl: share.content.image, // 分享图标
				success: function () {
					// 用户确认分享后执行的回调函数
					if (imonitor.add) imonitor.add({ label: '分享到朋友圈' });
					if (share.wxShareSuccess) share.wxShareSuccess();
				},
				cancel: function () {
					// 用户取消分享后执行的回调函数
					if (share.wxShareCancel) share.wxShareCancel();
				}
			});
			wx.onMenuShareAppMessage({
				title: share.content.title, // 分享标题
				desc: share.content.friend, // 分享描述
				link: sharelink, // 分享链接
				imgUrl: share.content.image, // 分享图标
				type: 'link', // 分享类型,music、video或link，不填默认为link
				dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
				success: function () {
					// 用户确认分享后执行的回调函数
					if (imonitor.add) imonitor.add({ label: '分享给朋友' });
					if (share.wxShareSuccess) share.wxShareSuccess();
				},
				cancel: function () {
					// 用户取消分享后执行的回调函数
					if (share.wxShareCancel) share.wxShareCancel();
				}
			});
			*/
			/*
			wx.getLocation({
				type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
				success: function (res) {
					var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
					var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
					var speed = res.speed; // 速度，以米/每秒计
					var accuracy = res.accuracy; // 位置精度
				}
			});
			*/
		}//end if
		else setTimeout(share.wxShare, 250);
	}//end func
	
	return share;
}//end import