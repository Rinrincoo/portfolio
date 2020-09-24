'use strict';
function toggleNav() {
    var body = document.body;
    var hamburger = document.getElementById('js-hamburger');
    var blackBg = document.getElementById('js-black-bg');

    hamburger.addEventListener('click', function() {
      body.classList.toggle('nav-open');
    });
    blackBg.addEventListener('click', function() {
	  body.classList.remove('nav-open');
	  body.classList.remove('.gloval-nav_item a');
    });
}
    toggleNav();


    $(function() {
		$('.text').textFx({
		　　　　type: 'fadeIn',
		　　　　iChar: 20,
		　　　　iAnim: '1000'
	　　　　});
	});


//fade in scroll
$(function(){
    $(window).scroll(function (){   //「windowがスクロールされたら以下の処理を実行する」という指定
        $('.fadein').each(function(){  //.each()で、「.fadein」が付いた要素1つずつに順番に処理を行うことを指定
            var position = $(this).offset().top;  //.offset().topで、ページの最上部から「.fadein」が付いた要素までの距離を取得して、変数positionに代入します。
            var scroll = $(window).scrollTop();   //.scrollTop()で、スクロールした量を取得して、変数scrollに代入します。
            var windowHeight = $(window).height();  //.height()で、ウィンドウの高さを取得して、変数windowHeightに代入します。
            //スクロール量が、「ページ最上部から要素までの距離」-「ウィンドウの高さ」を超えた時、
            //つまりスクロール量が要素の位置を過ぎた瞬間、「.fadein」が付いた要素にactiveクラスが付きます。
            //そしてCSSに記述したアニメーションが開始します。
            //要素が画面内に入って少し余裕を持ってアニメーションが開始されルよ ＋200で開始位置を設定する
            if (scroll > position - windowHeight + 200){
              $(this).addClass('active');
            }
        });
    });
});

// JavaScript Document

$(function() {
	var headerHight = 100;   
	// ナビゲーションのリンクを指定
	var navLink = $('.global-nav__list li a');

	// 各コンテンツのページ上部からの開始位置と終了位置を配列に格納しておく
	var contentsArr = new Array();
	for (var i = 0; i < navLink.length; i++) {
		// コンテンツのIDを取得
		var targetContents = navLink.eq(i).attr('href');
		// ページ内リンクでないナビゲーションが含まれている場合は除外する
		if(targetContents.charAt(0) == '#') {
			// ページ上部からコンテンツの開始位置までの距離を取得
			var targetContentsTop = $(targetContents).offset().top-headerHight;
			// ページ上部からコンテンツの終了位置までの距離を取得
			var targetContentsBottom = targetContentsTop + $(targetContents).outerHeight(true) - 1;
			// 配列に格納
			contentsArr[i] = [targetContentsTop, targetContentsBottom]
		}
	};

	// 現在地をチェックする
	function currentCheck() {
		// 現在のスクロール位置を取得
		var windowScrolltop = $(window).scrollTop();
		for (var i = 0; i < contentsArr.length; i++) {
			// 現在のスクロール位置が、配列に格納した開始位置と終了位置の間にあるものを調べる
			if(contentsArr[i][0] <= windowScrolltop && contentsArr[i][1] >= windowScrolltop){
				// 開始位置と終了位置の間にある場合、ナビゲーションにclass="current"をつける
				navLink.removeClass('current');
				navLink.eq(i).addClass('current');
				i == contentsArr.length;
			}
		};
	}

	// ページ読み込み時とスクロール時に、現在地をチェックする
	$(window).on('load scroll', function() {
		currentCheck();
	});

	// ナビゲーションをクリックした時のスムーズスクロール
	navLink.click(function() {
        var body = document.body;
		body.classList.remove('nav-open');
	    body.classList.remove('.gloval-nav_item');

		
        
		$('html,body').animate({
			scrollTop: $($(this).attr('href')).offset().top-headerHight
		}, 800);
		return false;

        
		
	})
});

