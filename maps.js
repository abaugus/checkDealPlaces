var data;
function handle_files(files) {
    for (i = 0; i < files.length; i++) {
        file = files[i];
        console.log(file);
        var reader = new FileReader();
        reader.onload = function(e) {
            //window.alert(e.target.result);
            data = CSVToArray(String(e.target.result));
            window.alert(String(data));
            //checkDeals();
            }
        reader.onerror = function(stuff) {
            console.log("error", stuff);
            console.log(stuff.getMessage());
        }
        reader.readAsText(file); //readAsdataURL
    }
}