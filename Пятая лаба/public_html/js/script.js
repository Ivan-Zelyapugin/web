// Зеляпугин Иван
$(document).ready(function() {
    var $figures = $('.figure');
    var $info = $('#info');
    $figures.each(function() {
        var minX = 0; 
        var maxX = $('#game-area').width() - $figures.width(); 
        var minY = 0; 
        var maxY = $('#game-area').height() - $figures.height(); 
        var startX = Math.floor(Math.random() * (maxX - minX + 1)) + minX; 
        var startY = Math.floor(Math.random() * (maxY - minY + 1)) + minY; 
        $(this).css({left: startX, top: startY});
        });
    
    function moveFigures() {
        $figures.each(function() {
            

            var $this = $(this);
            var shapeLeft = parseInt($this.css("left"));
            var shapeTop = parseInt($this.css("top"));
            var x = parseInt($this.data("x")) || 1;
            var y = parseInt($this.data("y")) || 1;
            var width = $this.width();
            var height = $this.height();
            var newLeft = shapeLeft + x;
            var newTop = shapeTop + y;
            if ($(this).hasClass('triangle')){
                if (newLeft <= 0 || newLeft >= $("#game-area").width() - width-45) {
                    x = -x;
                    newLeft = shapeLeft + x;
                }
                if (newTop <= 0 || newTop >= $("#game-area").height() - height-45) {
                    y = -y;
                    newTop = shapeTop + y;
                }
            }else{
                if (newLeft <= 0 || newLeft >= $("#game-area").width() - width) {
                    x = -x;
                    newLeft = shapeLeft + x;
                }
                if (newTop <= 0 || newTop >= $("#game-area").height() - height) {
                    y = -y;
                    newTop = shapeTop + y;
                }
            }
            $this.data("x", x);
            $this.data("y", y);
    
            $(this).css({
                 'left': newLeft + 'px',
                 'top': newTop + 'px',

            });
        });
    }

  
    setInterval(moveFigures, 9);
  
    $figures.on('click', function() {
        var $this = $(this);
    
        $this.hide();

        var shape = $this.data('shape');
        var color = $this.data('color');
        var $text = $('<div>').text(color + ' ' + shape);

        var $btn = $('<button>', {
            'text': 'Восстановить '
        });

        $btn.on('click', function() {
            $this.show();
            $btn.remove();
            $text.remove();

        });
        
        $info.append($text);
        $info.append($btn);
    });
});
