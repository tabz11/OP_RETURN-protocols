var req=  require('request');
var fs = require('fs');

var count = 431668; var index = 0,obj,pro, max_height;
var  t_only = [], d_only = [], txs =[],tx_scripts = [], opreturns = [];
var blk_no=[], time_s = [], tx_idd = [], script_new = [], pro_name = [],curr_height=[],prot_list = [];
var stream = fs.createWriteStream('pro-new-rem1.txt');
req('https://blockchain.info/latestblock', function (error, response, blocklist)// gets the height of the latest block chain
{
  if (error){console.log(error);}
  blocklist2 = JSON.parse(blocklist);
  max_height = blocklist2.height;
  console.log('maximum height is ' + blocklist2.height);
if (count<max_height)
opreturn_protocol();   
});
function opreturn_protocol()
{ req('http://api.coinsecrets.org/block/' + count, function(error, response, opreturn_data)
    {   obj = JSON.parse(opreturn_data);
     // console.log(opreturn_data);
        curr_height[count] = obj.height;
        opreturns [count] = obj.op_returns; 
        var op_return_height = obj.op_returns.length;     
        if(obj.timestamp==null)
      { console.log('No opreturns in this block'+  curr_height[count]);
       stream.write( 'No date'+','+'No Time'+','+curr_height[count]+','+ 'No Opreturns in this block'+'\r\n');
      }else
       { time_s[count] = obj.timestamp;
         var d = new Date(time_s[count]*1000);
         d_only[count] = d.getDate()+'/'+d.getMonth()+'/'+ d.getFullYear();
         t_only[count] = d.getHours()+':'+d.getMinutes()+':'+d.getSeconds(); 
         var y=0,t=0;
        for(var x=0;x<op_return_height;x++)
        {
        console.log('OP Returns Transaction ID ------->>>>'+opreturns[count][x].txid);
        console.log('OP Returns Script ------->>>>'+ opreturns[count][x].script);
        console.log('OP Returns ASCII ------->>>>'+ opreturns[count][x].ascii);
        var key = "name";
        var url ="url";  
        pro_name = opreturns[count][x].protocols;
        console.log(pro_name);
        if (pro_name.length == 0)
        { console.log('Unknown Protocol')
        console.log(d_only[count]+ ',' +t_only[count]+','+ curr_height[count]);
        stream.write(d_only[count]+ ',' +t_only[count]+','+ curr_height[count]+' , '+op_return_height+','+opreturns[count][x].txid+','+opreturns[count][x].script+','+'Unknown'+','+opreturns[count][x].ascii+'\r\n');
        }else {
        for (var k=0;k<pro_name.length;k++){
          
        stream.write(d_only[count]+ ',' +t_only[count]+',' + curr_height[count]+' , '+op_return_height+','+opreturns[count][x].txid+','+opreturns[count][x].script+','+pro_name[k][key]+', '+opreturns[count][x].ascii+'\r\n');
        console.log(pro_name[k][key])}}} }
  count += 1; if (count<max_height){opreturn_protocol(opreturn_protocol)}});}





























