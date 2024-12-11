(function ($) {
	$.fn.fadeUp = function delayScrollAnime(options) {
		var defaults = {
			delay: 0.2//遅延時間の初期値
		};
		var params = $.extend(defaults, options);
		var time = params.delay;//遅延時間の設定
		var value = time;//遅延時間を増やす秒数の値保持の変数
		//ここでclass名を取得
		var elemPosArray = ["." + this.attr('class')];
		var elemPos = new Array();
		var childs = new Array();
		var numClass = new Array();
		//配列不要だが、将来の拡張可能性の為、このまま構造をキープする
		elemPosArray.forEach(function (ele, i = 1) {
			elemPos[i] = $(ele).offset().top;
			childs[i] = $(ele).children();
			numClass[i] = $(ele).length;
			i++;
		});

		var scroll = $(window).scrollTop();//スクロール値を取得
		var windowHeight = $(window).height();//画面の高さを取得

		elemPosArray.forEach(function (ele, ii = 1) {

			if (scroll >= elemPos[ii] - windowHeight && !$(ele).hasClass("play")) {//指定領域内にスクロールが入ったらまた親要素にクラスplayがなければ
				for (var i = 1; i <= childs[ii].length / numClass[ii]; i++) {//子要素の数だけLoop

					if (!$(ele + " > :nth-child(" + i + ")").hasClass("fadeUp")) {//直下の子要素にアニメーションのクラス名が指定されているかどうかをチェック

						$(ele).addClass("play");	//親要素にクラス名playを追加
						$(ele + " > :nth-child(" + i + ")").css("animation-delay", value + "s");//アニメーション遅延のCSS animation-delayを追加し
						$(ele + " > :nth-child(" + i + ")").addClass("fadeUp");//アニメーションのクラス名を追加
						value = value + time;//delay時間を増加させる

						// 全ての処理を終わったらplayを外す
						if (i == childs[ii].length / numClass[ii]) {
							$(ele).removeClass("play");
						}
					}
				}
			} else {
				$(childs[ii]).removeClass("fadeUp");//アニメーションのクラス名を削除
				value = time;//delay初期値の数値に戻す
			}
			i++;
		});
	}
})(jQuery);

$(window).scroll(function () {
	$(".delayScroll").fadeUp({
		delay: 0.2
	});/* アニメーション用の関数を呼ぶ*/
	$(".delayScroll2").fadeUp({
		delay: 0.9
	});/* アニメーション用の関数を呼ぶ*/
});// ここまで画面をスクロールをしたら動かしたい場合の記述

// 画面が読み込まれたらすぐに動かしたい場合の記述
$(window).on('load', function () {
	$(".delayScroll").fadeUp({
		delay: 0.2
	});/* アニメーション用の関数を呼ぶ*/
	$(".delayScroll2").fadeUp({
		delay: 0.9
	});/* アニメーション用の関数を呼ぶ*/
});// ここまで画面が読み込まれたらすぐに動かしたい場合の記述