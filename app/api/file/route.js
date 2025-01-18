import { list } from "@vercel/blob";

// export async function GET(request) {
//     const { blobs } = await list();
//     return Response.json(blobs);
//   }
  

//   import { list } from "@vercel/blob";

// export async function GET(request) {
//     try {
//         const { blobs } = await list();
//         return new Response(JSON.stringify(blobs), {
//             headers: {
//                'Content-Type': 'application/json',
//                'Authorization':  "Bearer vercel_blob_rw_qbK07pEn6ZRFrJGs_WTCihZfuutRheEZi8SxHkSVCpPfZha"
//             },
//         });
//     } catch (error) {
//         console.error("Error listing blobs:", error); // Log the error for debugging
//         return new Response(`Internal Server Error: ${error.message}`, { status: 500 });
//     }
// }


const MY_BLOB_TOKEN = process.env.BLOB_READ_WRITE_TOKEN; // **REPLACE "YOUR_ACTUAL_TOKEN"**

export async function GET(request) {
    try {
        const { blobs } = await list({ token: MY_BLOB_TOKEN });
        return new Response(JSON.stringify(blobs), {
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error("Error listing blobs:", error);
        return new Response(`Error: ${error.message}`, { status: 500 });
    }
}