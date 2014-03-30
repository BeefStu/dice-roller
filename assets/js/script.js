$('.btn').on('click', function() {
    //Set the jQuery object instance of the button to a new variable
    $this = $(this);
    //Find the value for the "data-val" attribute on the button
    var parent = $this.parent(); 
    var rollContainer = $this.siblings('.roll-container');
    var diceSize = parent.data('val');
    var action = $this.data('action');
    var rollDice = getRandomizer(1, diceSize);
    
    
    if(action === "reset") {
        $('h3.inverse.size_'+diceSize).remove();
        $('h3.total_'+diceSize).remove();
    }
    else {
       var diceRoll = $('<h3 class="inverse size_' + diceSize + '">' + rollDice() + '</h3>');
       rollContainer.prepend(diceRoll);
       
       var total = 0;
       $('h3.inverse.size_'+diceSize).each(function(index) {
          total += parseInt($(this).html());
       });
        
        var totalDiv = rollContainer.find('.total_' + diceSize);
        
        if(totalDiv.length === 0)
        {
            var total = $('<h3 class="total_' + diceSize + '">Total: ' + total + '</h3>');
            rollContainer.prepend(total);
        }
        else {
            totalDiv.html('Total: ' + total);
            rollContainer.prepend(totalDiv);
        }
    }
    resetPageTotal();
});


function getRandomizer(bottom, top) {
    return function() {
        return Math.floor( Math.random() * ( 1 + top - bottom ) ) + bottom;
    }
}

function resetPageTotal() {
    var pageDiceTotal = 0;
    var dice = [4,6,8,10,12,20];
    
    $.each(dice, function(index, value) {
        $('h3.inverse.size_' + value).each(function(index) {
            pageDiceTotal += parseInt($(this).html());
        });
    });

    $('#totalDiceAmount').html(pageDiceTotal);
}