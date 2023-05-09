$(window).on('load',function(){
	//長度
	$('.programBox .phaseBox').each(function(){
		var stage = $(this).data('stage');
		var percent = $(this).data('percent')/100;
	
		var length = 0;
		var totleStage = 4; // only 4 stage

		if (stage > 0 && stage <= totleStage && percent>=0 && percent<=1){
			for(var i=0; i < stage; i++) {
				if(i < stage-1) {
					length += (100 / totleStage);
				}else{
					length += (100 / totleStage)*percent;
				}
			}
			if(length == 100) {
				$(this).find('.pipeline').addClass('complete');
			}
			$(this).find('.pipeline').data('length',length+'%');
		}
	});
	
	$(window).resize(function () {
		var $width = window.innerWidth;
		if ($width > 1180) {
			$('.program .item').removeClass('detailOpen').removeClass('open');
			$('.phaseOuterBox').attr('style','');
			$('.programBox ul').attr('style','');
		}
	});
	$('.program .item').click(function(){
		var $width = window.innerWidth;
		var time = 0.3;
		var slot = 0.2;

		if ($width <= 1180) {
			if (!$(this).hasClass('detailOpen')) {
				$(this).addClass('detailOpen');
				$(this).siblings().slideDown();
				$(this).parent().siblings().slideDown();
				$(this).parents('.programBox').siblings().find('.item').removeClass('detailOpen');
				$(this).parents('.programBox').siblings().find('.phaseOuterBox').slideUp();
				$(this).parents('.programBox').siblings().find('ul').slideUp();

				$(this).siblings().find('.pipeline').css({
					'width': $(this).siblings().find('.pipeline').data('length'),
					'transition-delay': time + 's',
					'transition-duration': '0.8s'
				});
				time += slot;
				
				$(this).parent().siblings().find('.pipeline').each(function () {

					$(this).css({
						'width': $(this).data('length'),
						'transition-delay': time + 's',
						'transition-duration': '0.8s'
					});
					time += slot;
				})
				$(this).parents('.programBox').siblings().find('.pipeline').each(function () {

					$(this).css({
						'width': 0,
						'transition-delay': '0.6s',
						'transition-duration': '0s'
					});
				})
			} else {
				$(this).removeClass('detailOpen');
				$(this).siblings().slideUp();
				$(this).parent().siblings().slideUp();

				$(this).siblings().find('.pipeline').css({
					'width': 0,
					'transition-delay': '0.6s',
					'transition-duration': '0s'
				});
				$(this).parent().siblings().find('.pipeline').each(function () {
					$(this).css({
						'width': 0,
						'transition-delay': '0.6s',
						'transition-duration': '0s'
					});
				})
			}

		}else {
			if ($(this).hasClass('plus')) {
				if (!$(this).hasClass('open')) {
					$(this).addClass('open');
					$(this).parent().siblings().slideDown();
					$(this).parents('.programBox').siblings().find('.item').removeClass('open')
					$(this).parents('.programBox').siblings().find('ul').slideUp();

					$('ul .pipeline').each(function () {
	
						$(this).css({
							'width': 0,
							'transition-delay': '0.6s',
							'transition-duration': '0s'
						});
					})
					$(this).parent().siblings().find('.pipeline').each(function () {
	
						$(this).css({
							'width': $(this).data('length'),
							'transition-delay': time + 's',
							'transition-duration': '0.8s'
						});
						time += slot;
					})
	
				}else {
					$(this).removeClass('open');
					$(this).parent().siblings().slideUp();
					
					$(this).parent().siblings().find('.pipeline').each(function () {
						$(this).css({
							'width': 0,
							'transition-delay': '0.6s',
							'transition-duration': '0s'
						});
					})
				}
			}
		}


	});
})
