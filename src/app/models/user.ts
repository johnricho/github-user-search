export interface User {
    id: number;
     name: string;
     login: string;
     avatar?: string;
     url: string;
     html_url: string;
     location: string;
     bio: string;
     repos: string;
     followers?: number;
     following?: number;
     created_at: Date;

    // constructor(instanceData?: User) {
    //     if (instanceData) {
    //       this.deserialize(instanceData);
    //     }
    // }
    
    //    deserialize(instanceData: User) {
    //     // Note this.active will not be listed in keys since it's declared, but not defined
    //     const keys = Object.keys(this);
    
    //     for (const key of keys) {
    //       if (instanceData.hasOwnProperty(key)) {
    //         this[key] = instanceData[key];
    //       }
    //     }
    //   }
  
  }