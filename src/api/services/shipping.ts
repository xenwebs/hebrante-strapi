import axios from 'axios';

const BASE_URL = 'https://api.skydropx.com/v1';

export default {
  async getRates(data: any) {
    try {
      const res = await axios.post(
        `${BASE_URL}/quotations`,
        data,
        {
          headers: {
            Authorization: `Bearer ${process.env.SKYDROPX_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return res.data;
    } catch (error: any) {
      console.error('SkyDropX error:', error.response?.data || error.message);
      throw error;
    }
  },
};