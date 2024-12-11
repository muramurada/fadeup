function delayScrollAnime() {
	//flex用ふわっと浮き出るアニメーション効果。flex block全体が同じ動作となる。
	//flexの列は、任意の数に対応
	var time = 0.2;//遅延時間の初期値
	var value = time;//遅延時間を増やす秒数の値保持の変数
	//ユーザー設定：HTML内のfadeUpさせたいflex blockの子要素（例：UL）にclassを振る
	//そのclassをこの配列に記載。
	var elemPosArray = [".delayScroll", ".delayScroll2"];
	var elemPos = new Array();
	var childs = new Array();
	var numClass = new Array();
	elemPosArray.forEach(function (ele, i = 1) {
		elemPos[i] = $(ele).offset().top;
		childs[i] = $(ele).children();
		numClass[i] = $(ele).length;
		i++;
	});
	var column = 3;

	var scroll = $(window).scrollTop();//スクロール値を取得
	var windowHeight = $(window).height();//画面の高さを取得

	elemPosArray.forEach(function (ele, ii = 1) {

		if (scroll >= elemPos[ii] - windowHeight && !$(ele).hasClass("play")) {//指定領域内にスクロールが入ったらまた親要素にクラスplayがなければ
			console.log("value1 =", value);
			console.log("childs =", childs[ii].length / numClass[ii]);
			for (var i = 1; i <= childs[ii].length / numClass[ii]; i++) {//子要素の数だけLoop
				console.log("i=", i);

				if (!$(ele + " > :nth-child(" + i + ")").hasClass("fadeUp")) {//直下の子要素にアニメーションのクラス名が指定されているかどうかをチェック

					$(ele).addClass("play");	//親要素にクラス名playを追加
					$(ele + " > :nth-child(" + i + ")").css("animation-delay", value + "s");//アニメーション遅延のCSS animation-delayを追加し
					$(ele + " > :nth-child(" + i + ")").addClass("fadeUp");//アニメーションのクラス名を追加
					value = value + time;//delay時間を増加させる
					console.log("value1 if=", value);

					// 全ての処理を終わったらplayを外す
					if (i == childs[ii].length / numClass[ii]) {
						$(ele).removeClass("play");
					}
				}
			}
		} else {
			$(childs[ii]).removeClass("fadeUp");//アニメーションのクラス名を削除
			value = time;//delay初期値の数値に戻す
			console.log("value else=", value);
		}
		i++;
	});
}
$(window).scroll(function () {
	delayScrollAnime();/* アニメーション用の関数を呼ぶ*/
});// ここまで画面をスクロールをしたら動かしたい場合の記述

// 画面が読み込まれたらすぐに動かしたい場合の記述
$(window).on('load', function () {
	delayScrollAnime();/* アニメーション用の関数を呼ぶ*/
});// ここまで画面が読み込まれたらすぐに動かしたい場合の記述