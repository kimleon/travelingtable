counter = 1;
var limit = 10;
function addInput(divName){
     if (counter == limit)  {
          alert("You have reached the limit of adding " + counter + " inputs");
     }
     else {
          var newdiv = document.createElement('div');
          newdiv.innerHTML = "<div id='input"+(counter + 1)+"'><br> Step " + (counter + 1) + " <br><textarea  class='bigger' type='text'  onkeypress='return separateKey(event)' name='input"+(counter + 1)+"'></textarea><br></div>";
          counter=counter+1;
          document.getElementById(divName).appendChild(newdiv);
          //console.log(counter)
     }
}

function removeInput(){
     //find out if last box is empty
     //var contents = $('#input'+counter).val();
     //console.log(contents);
     if (counter === 1)  {
          //console.log(counter);
          alert("You cannot remove any more " + counter + " inputs");
     }
     else {

          $('#input'+counter).remove();
          counter = counter - 1;
          //var newdiv = document.createElement('div');
          //newdiv.innerHTML = "<br>Step " + (counter - 1) + " <br><textarea  class='bigger' type='text' id='input"+counter+"' name='myInputs[]'></textarea><br>";
          //document.getElementById(divName).appendChild(newdiv);
          //counter++;
     }
}




counterbox = 1;
var limitbox = 30;
function addInputbox(divName){
     if (counterbox == limitbox)  {
          alert("You have reached the limit of adding " + counterbox + " inputs");
     }
     else {
          var newdiv = document.createElement('div');
          newdiv.innerHTML = "<div id='boxinput"+(counterbox + 1)+"'><li style='padding-top: 7px;'><input type='text'  onkeypress='return separateKey(event)' name='boxinput"+(counterbox + 1)+"' /></li></div>";
          counterbox++;
          document.getElementById(divName).appendChild(newdiv);
          //console.log(counterbox)
     }
}

function removeInputbox(){
     //find out if last box is empty
     //var contents = $('#input'+counter).val();
     //console.log(contents);
     if (counterbox === 1)  {
          //console.log(counterbox);
          alert("You can't remove any more boxes!");
     }
     else {

          $('#boxinput'+counterbox).remove();
          counterbox = counterbox - 1;
          //var newdiv = document.createElement('div');
          //newdiv.innerHTML = "<br>Step " + (counter - 1) + " <br><textarea  class='bigger' type='text' id='input"+counter+"' name='myInputs[]'></textarea><br>";
          //document.getElementById(divName).appendChild(newdiv);
          //counter++;
     }
}