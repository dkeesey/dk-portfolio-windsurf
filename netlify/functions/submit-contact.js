const axios = require('axios');

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return { 
      statusCode: 405, 
      body: JSON.stringify({ message: 'Method Not Allowed' }) 
    };
  }

  try {
    const payload = JSON.parse(event.body);

    // Basic validation
    if (!payload.name || !payload.email || !payload.subject || !payload.message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Missing required fields' })
      };
    }

    // Optional: Send notification to your email or preferred service
    // Example using hypothetical email service
    /*
    await axios.post('https://api.emailservice.com/send', {
      to: 'your-email@example.com',
      subject: `New Contact Form: ${payload.subject}`,
      text: `
        Name: ${payload.name}
        Email: ${payload.email}
        Message: ${payload.message}
      `
    });
    */

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        message: 'Form submission received successfully'
      })
    };
  } catch (error) {
    console.error('Submission error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        message: 'Error processing submission', 
        error: error.message 
      })
    };
  }
};
