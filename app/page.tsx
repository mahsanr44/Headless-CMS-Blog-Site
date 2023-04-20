import { documentToReactComponents } from "@contentful/rich-text-react-renderer"


const getBlogsData =async () => {
    try{

   
    const blogData = await fetch("https://cdn.contentful.com/spaces/e4jo3xrvu1cj/entries?access_token=MiSmt-ZD4IwCvVvYQX56TECya48kEpjt1HDbuV7UKYM&content_type=blog")
    
    if(!blogData.ok){
        console.log("Unable to find blog data")
        throw new Error("Unable to find blog data...");
    }

        return blogData.json();
    }
    catch(error){
        console.log(error)
    }
} 

const Home = async () => {
    const blogData= await getBlogsData()
    // console.log(blogData)


  return (
      <div>
        <h1 className="uppercase font-extrabold text-5xl text-center m-5 text-blue-900">My First Headless CMS Blog Site</h1>
        
        {blogData.items.map((blog:any)=>{

        const blogImg = blogData.includes.Asset.find((img:any)=>img.sys.id===blog.fields.image.sys.id)
        const imgUrl = blogImg.fields.file.url
        // console.log(imgUrl)
            
        const authorData = blogData.includes.Entry.find((author:any)=>author.sys.id===blog.fields.author.sys.id)
        const authorName = authorData.fields.name
        // console.log(authorName)
    
    return(
        <div className="m-5" key={blog.sys.id}>
            <h1 className="text-2xl font-extrabold mb-2 ">{blog.fields.title}</h1>
            <p className="flex flex-wrap">{documentToReactComponents(blog.fields.description)}</p>
            <div className="flex">
                <img className="h-72 w-96 mt-5" src={imgUrl} alt="Image" />
            <h1 className="m-10 mt-36 text-red-700"> {"Author: "+ authorName}</h1>
                </div>
        </div>
    )
})}
    </div>
  )
}

export default Home
