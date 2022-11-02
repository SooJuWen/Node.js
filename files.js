const fs = require('fs'); //file system 

//read file
// asynchronous function, once it is donw, it will callback the function inside
// fs.readFile('./docs/my.txt', (err, data) =>{
//     if(err){
//         console.log(err);
//     }
//     console.log(data.toString());
// });

// console.log('last line');

//write file
// fs.writeFile('./docs/my2.txt', 'hello, again', () =>{
//     console.log('file was written');
// })

//directories
// if(!fs.existsSync('./assets')){
//     fs.mkdir('./assets', (err) => {
//         if(err){
//             console.log(err);
//         }
//         console.log("folder created");
//     });
// }
// else{
//     fs.rmdir('./assets', (err) => {
//         if(err){
//             console.log(err);
//         }
//         console.log('folder deleted');
//     });
// }

//delete file
if(fs.existsSync('./docs/deleteme.txt')){
    fs.unlink('./docs/deleteme.txt', (err) => {
        if(err){
            console.log(err);
        }
        console.log('file deleted')
    });
}
