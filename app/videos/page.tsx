import { getAllVideos } from "@/lib/videos";
import { fetchYouTubeVideos } from "@/lib/youtube";
import { VideosList } from "@/components/videos-list";

export default async function VideosPage() {
  const metaList = getAllVideos();
  const apiKey = process.env.YOUTUBE_API_KEY;
  const apiUrl = process.env.YOUTUBE_API_URL;

  const ids = metaList.map((v) => v.youtubeId);
  const infos =
    apiKey && ids.length > 0
      ? await fetchYouTubeVideos(ids, apiKey, apiUrl ?? undefined)
      : [];

  const infoMap = new Map(infos.map((i) => [i.id, i]));
  const videos = metaList.map((v) => {
    const info = infoMap.get(v.youtubeId);
    return {
      id: v.youtubeId,
      title: info?.title ?? v.title ?? v.youtubeId,
      thumbnailUrl: info?.thumbnailUrl ?? "",
    };
  });

  return (
    <section className="pb-20">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
        Videos
      </h1>
      <p className="text-muted-foreground mt-2">
        Danh sách video từ YouTube. Bấm vào để xem.
      </p>

      <div className="mt-6">
        {videos.length > 0 ? (
          <VideosList videos={videos} />
        ) : (
          <p className="text-muted-foreground">Chưa có video nào.</p>
        )}
      </div>
    </section>
  );
}
