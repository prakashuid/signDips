



export  async function handler(request, response) {
    const result = await fetch("https://api.vercel.com/v9/projects/SOME_STRING|BOOLEAN_VALUE?slug=SOME_STRING_VALUE&teamId=SOME_STRING_VALUE", {
      "headers": {
        "Authorization": "Bearer vercel_blob_rw_qbK07pEn6ZRFrJGs_WTCihZfuutRheEZi8SxHkSVCpPfZha"
      },
      "method": "get"
    });
    const data = await result.json();
   return response.status(200).json(data);
  }
