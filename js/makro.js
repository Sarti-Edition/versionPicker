
//listener zum Umschalten der Details
$('#toggleDetailBtn').on('click',function(e) {
    $('#movementBox .mdiv p').toggle(); 
    
    $('#toggleDetailBtn').toggleClass('btn-primary').toggleClass('btn-default');
    //hier änderst Du den ToggleButton. Ggf. auch den Text des Buttons ändern
    
    /*
     * if(text des Btn oder hasClass('btn-primary') = $(btn).text('Show Details')
     * else
     *  halt andersrum… 
     * 
     * 
     */
    
});

//listener zum aufrufen von getList()
$('#getMdivsBtn').on('click',function(e) {
    getList();
});

/*Drag and Drop*/

function allowDrop(ev) {
    ev.preventDefault();
};

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
};

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var newID = data.indexOf('dropped_') === 0 ? data : 'dropped_' + data;
    
    //clone element into temporary variable
    var temp = $('#' + data).clone();
    //adjust ID to prevent doubled IDs
    $(temp).attr('id',newID);
    //remove detail information
    $(temp).children('p').remove();
    //
    var removeBtn = '<span class="removeBtn glyphicon glyphicon-remove-sign"  onclick="removeMdiv(&apos;' + newID + '&apos;)" aria-hidden="true"></span>'
    $(temp).append($(removeBtn));
    
    var targetID = ev.target.id;
    
    //if dropped on element inside the mdiv, use mdiv instead
    if(targetID.length === 0 && $(ev.target).parents('.mdiv')) {
        targetID = $(ev.target).parents('.mdiv').attr('id');
    }
    
    var droppedOnMdiv = targetID.indexOf('dropped_') === 0;
    var droppedToList = ev.target.id === 'customMdivs';
    var isInListAlready = $('#' + newID).length === 1
    
    //mdiv is already in list and is dropped on other mdiv for reordering -> move before that other mdiv
    if(droppedOnMdiv && isInListAlready) {
        $('#' + targetID).before($('#' + newID));
    //a new mdiv is dropped onto an existing mdiv
    } else if(droppedOnMdiv && !isInListAlready) {
        $('#' + targetID).before($(temp));
    //a new mdiv is dropped onto the list    
    } else if(droppedToList && !isInListAlready) {
        ev.target.appendChild($(temp).get(0));
    //an mdiv already in the list is dropped onto the list
    } else if(droppedToList && isInListAlready) {
        ev.target.appendChild($('#' + newID).get(0));
    } else {
        console.log('something went wrong');
        return;
    }
    
    $('.mdiv.marked, #customMdivs.marked').removeClass('marked');
};

function markTarget(ev) {
    $('.mdiv.marked, #customMdivs.marked').removeClass('marked');
    $(ev.target).addClass('marked');
};


function unmarkTarget(ev) {
    $(ev.target).removeClass('marked');
};

function removeMdiv(mdivID) {
    $('#' + mdivID).remove();  
};

function getList() {
    console.log('starting to extract list');
    
    var mdivs = $('#customMdivs .mdiv');
    
    console.log(mdivs.length + ' Sätze gefunden.');
    
    var mdivIDs = []
    
    $(mdivs).each(function(index) {
        mdivIDs.push($(this).attr('id').substr(8)); 
    });
    
    console.log(mdivIDs);
    console.log(mdivIDs.join(', '));
    
};


