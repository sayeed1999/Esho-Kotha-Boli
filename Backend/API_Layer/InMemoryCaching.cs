using Microsoft.Extensions.Caching.Memory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_Layer
{
    /// <summary>
    /// I created it and injected it in Startup.cs in Configure Services() as a 'singleton' method to force
    /// IMemoryCache work like a singleton! Later, I found that Microsoft does it for us.
    /// </summary>
    public class InMemoryCaching
    {
        public readonly IMemoryCache memoryCache;

        public InMemoryCaching(IMemoryCache memoryCache)
        {
            this.memoryCache = memoryCache;
        }
    }
}
