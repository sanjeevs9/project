export default function PostCard({
  author,
  published,
  title,
  content,
  avatar,
}) {
  return (
    <div
      className="justify-center
    "
    >
      <div className="flex flex-row pb-2">
        <div
          className={`h-6 w-6 rounded-full flex  flex-col items-center justify-center overflow-hidden`}
          dangerouslySetInnerHTML={{ __html: avatar }}
          style={{ maxWidth: "100%", maxHeight: "100%" ,backgroundColor: getRandomColor()}}
        />
        <div className=" flex flex-col justify-center pl-2 font-semibold">
          {author}
        </div>
        <div className="pl-1 text-slate-600">
          <div className="">&#903;</div>
        </div>
        <div className="flex flex-col justify-center pl-1 text-slate-500 font-mono">
          {published}
        </div>
      </div>
      <div className="font-bold">{title}</div>
      <div className="text-sm pb-4 max-w-xl">
        {content.length >= 100
          ? content.slice(0, 200) + "..."
          : content + "..."}
      </div>
      <div className="text-sm text-slate-600">
        {Math.ceil(content.length / 100) + "min read"}
      </div>
      <div>
        <hr className="h-px my-8 bg-gray-200 border-0 " />
      </div>
    </div>
  );
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }