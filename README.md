
# Hack naver login status
Any websites can check if you have logged in to naver.

# How does it work?
In most browser, you can send GET to cross-origin pages but can't get response data from them.
You can't even find out if the request is success or failed.
But you can get response time, using iframe tag's onload event.

In most websites, the time to return page that has content will be longer than the time to return 404 page.
So, you can use page(ex: account management page) conditional about login status as checker about if user has logged in or not.