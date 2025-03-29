export function Spinner() {
  return (
    <div className="flex items-center h-screen">
      <div className="relative m-auto w-10 h-10">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-full h-full left-0 top-0 before:content-[''] before:block before:mx-auto before:w-[15%] before:h-[15%] before:bg-neutral-800 before:rounded-full before:animate-[sk-fade_1.2s_ease-in-out_infinite] before:opacity-0`}
            style={{
              transform: `rotate(${i * 30}deg)`,
              animationDelay: `${-1.1 + i * 0.1}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

// 添加自定义动画
const styles = `
  @keyframes sk-fade {
    0%, 39%, 100% { opacity: 0; }
    40% { opacity: 1; }
  }
`;

// 将动画样式注入到head中
if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}
