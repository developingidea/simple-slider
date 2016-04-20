window.first = true;
window._maxWidth = '';
$.fn.simpleslider = function(){	
	$logic = {
		animationSpeed: 300,
		_updateHeight: function(current, nth) {			
			id = current.find('.move ul').attr('id')
			_Height = $('ul#'+id+' li:nth-child('+nth+')').height();
			$('#'+id+'').parent().animate({ height: _Height }, $logic.animationSpeed)			
		},
		_navigationButtons: function() {
			$(document).on('click', '.simpleslider-container li', function (){				
				nth = $(this).attr('data-nav')
				$clickConatiner = $(this).parent().parent()
				$logic._updateHeight($clickConatiner, eval(nth)+1)
				$clickConatiner.find('.simpleslider-container li').removeClass('active')
				$(this).addClass('active')
				$clickConatiner.find('.move ul').animate({ marginLeft: -nth*_maxWidth }, $logic.animationSpeed)
			});		
		},
		init: function() {
			if ( window.first ) {
				window.first = false;
				$logic._navigationButtons()
			}
		}
	};
	$logic.init();	
	this.each(function(){
		$this = $(this)
		$logic._updateHeight($this, 1);	
		window._maxWidth = $this.width();
		id = $this.attr('id')
		$this.wrap('<div class="simpleslider-box"><div class="move"></div></div>')
		$this.parent().parent().append('<ul class="simpleslider-container"></ul>')
		$container = $this.parent().parent().find('.simpleslider-container');
		$this.find('li').each(function(){
			$(this).css({ width: _maxWidth })
			$container.append('<li data-nav="'+$(this).index()+'">'+$(this).index()+'</li>')
		});
		$container.find('li:first-child').trigger('click')
		$this.parent().parent().css({ width: _maxWidth })
	});	
 return this;
};