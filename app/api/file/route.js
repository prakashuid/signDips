import { list } from "@vercel/blob";

// export async function GET(request) {
//     const { blobs } = await list();
//     return Response.json(blobs);
//   }
  

//   import { list } from "@vercel/blob";

export async function GET(request) {
    try {
        const { blobs } = await list();
        return new Response(JSON.stringify(blobs), {
            headers: {
               'Content-Type': 'application/json',
               'Authorization':  "Bearer vercel_blob_rw_qbK07pEn6ZRFrJGs_WTCihZfuutRheEZi8SxHkSVCpPfZha"
            },
        });
    } catch (error) {
        console.error("Error listing blobs:", error); // Log the error for debugging
        return new Response(`Internal Server Error: ${error.message}`, { status: 500 });
    }
}