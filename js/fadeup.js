function delayScrollAnime() {
	var time = 0.2;//遅延時間の初期値
	var value = time;//遅延時間を増やす秒数の値保持の変数
	var elemPos = $(".delayScroll").offset().top;//親要素の位置まで来たら
	var elemPos2 = $(".delayScroll2").offset().top;//親要素の位置まで来たら

	var scroll = $(window).scrollTop();//スクロール値を取得
	var windowHeight = $(window).height();//画面の高さを取得
	var childs = $(".delayScroll").children();	//子要素を取得
	var childs2 = $(".delayScroll2").children();	//子要素を取得
	console.log("scroll=",scroll);
	console.log("scroll-in=",elemPos - windowHeight);

//memo scrollから何番目のdelayScrollかを判定
//考え中

	if (scroll >= elemPos - windowHeight && !$(".delayScroll").hasClass("play")) {//指定領域内にスクロールが入ったらまた親要素にクラスplayがなければ
		console.log("Into if");
		for(var i = 1; i <= childs.length; i++) {//子要素の数だけLoop
			console.log("i=",i);
		
			if (!$(".delayScroll > :nth-child(" + i + ")").hasClass("fadeUp")) {//直下の子要素にアニメーションのクラス名が指定されているかどうかをチェック
				
				$(".delayScroll").addClass("play");	//親要素にクラス名playを追加
				$(".delayScroll > :nth-child(" + i + ")").css("animation-delay", value + "s");//アニメーション遅延のCSS animation-delayを追加し
				$(".delayScroll > :nth-child(" + i + ")").addClass("fadeUp");//アニメーションのクラス名を追加
				value = value + time;//delay時間を増加させる
					
				// 全ての処理を終わったらplayを外す
				if(i == childs.length){
					$(".delayScroll").removeClass("play");
				}
			}
		}
	}else {
		$(childs).removeClass("fadeUp");//アニメーションのクラス名を削除
		value = time;//delay初期値の数値に戻す
	}

	if (scroll >= elemPos2 - windowHeight && !$(".delayScroll2").hasClass("play")) {//指定領域内にスクロールが入ったらまた親要素にクラスplayがなければ
		$(childs).removeClass("fadeUp");//アニメーションのクラス名を削除(a kind of running way)
		value = time;//delay初期値の数値に戻す
		for(var i = 1; i <= childs2.length; i++) {//子要素の数だけLoop
		
			if (!$(".delayScroll2 > :nth-child(" + i + ")").hasClass("fadeUp")) {//直下の子要素にアニメーションのクラス名が指定されているかどうかをチェック
				
					$(".delayScroll2").addClass("play");	//親要素にクラス名playを追加
					$(".delayScroll2 > :nth-child(" + i + ")").css("animation-delay", value + "s");//アニメーション遅延のCSS animation-delayを追加し
					$(".delayScroll2 > :nth-child(" + i + ")").addClass("fadeUp");//アニメーションのクラス名を追加
					value = value + time;//delay時間を増加させる
					
					// 全ての処理を終わったらplayを外す
					if(i == childs2.length){
						$(".delayScroll2").removeClass("play");
					}
				}
			}
	}else {
		$(childs2).removeClass("fadeUp");//アニメーションのクラス名を削除
		value = time;//delay初期値の数値に戻す
	}
}

// 画面をスクロールをしたら動かしたい場合の記述(a kind of running way)
var scroll = 0;
	$(window).on('scroll', function (){
		if($(this).scrollTop() < scroll ){
			//上スクロールの時の処理
		}else{
			//下スクロールの時の処理
			delayScrollAnime();/* アニメーション用の関数を呼ぶ*/
		}
		scroll = $(this).scrollTop();
	});// ここまで画面をスクロールをしたら動かしたい場合の記述

	// $(window).scroll(function (){
	// 		delayScrollAnime();/* アニメーション用の関数を呼ぶ*/
	// });// ここまで画面をスクロールをしたら動かしたい場合の記述

// 画面が読み込まれたらすぐに動かしたい場合の記述
	$(window).on('load', function(){
		delayScrollAnime();/* アニメーション用の関数を呼ぶ*/
	});// ここまで画面が読み込まれたらすぐに動かしたい場合の記述